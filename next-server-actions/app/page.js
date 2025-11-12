import mongoose from 'mongoose';
import { revalidatePath } from 'next/cache';

await mongoose.connect('mongodb://127.0.0.1:27017/mongoose_test');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema, 'users', { overwriteModels: true });

// --- Server Action ---
async function addUser(formData) {
  'use server';
  const name = String(formData.get('name') || '').trim();
  await User.create({ name });
  revalidatePath('/');
}

// --- Page ---
export default async function Page() {
  const users = await User.find().sort({ _id: -1 }).lean();

  return (
    <main style={{ fontFamily: 'sans-serif', maxWidth: 480, margin: '2rem auto' }}>
      <h1 style={{ marginBottom: '0.75rem' }}>Users</h1>

      <form action={addUser} style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
        <input
          name="name"
          placeholder="Enter name"
          required
          style={{ flex: 1, padding: '0.5rem' }}
        />
        <button type="submit" style={{ padding: '0.5rem 0.9rem' }}>Add</button>
      </form>

      <ul style={{ paddingLeft: '1rem' }}>
        {users.map((u) => (
          <li key={u._id} style={{ margin: '0.25rem 0' }}>
            {u.name}
          </li>
        ))}
      </ul>
    </main>
  );
}
