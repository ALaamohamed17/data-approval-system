<template>
  <div class="form-container">
    <div class="form-header">
      <h2>Submit New Entry</h2>
      <p class="subtitle">Fill in the details below to create a new submission</p>
    </div>

    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label>Category:</label>
        <select v-model="form.category" required>
          <option value="">-- Select Category --</option>
          <option>Travel</option>
          <option>Food</option>
          <option>Supplies</option>
        </select>
      </div>

      <div class="form-group">
        <label>Amount:</label>
        <input type="number" v-model.number="form.amount" required />
      </div>

      <div class="form-group">
        <label>Date:</label>
        <input type="date" v-model="form.date" required />
      </div>

      <div class="form-group">
        <label>Notes (optional):</label>
        <textarea v-model="form.notes" placeholder="Any details..." rows="4"></textarea>
      </div>

      <div class="calc-box">
        <span class="calc-label">Calculated Value (+10%):</span>
        <span class="calc-value">{{ calculatedValue }}</span>
      </div>

      <div class="button-group">
        <button type="submit" class="btn-primary">
          <span>✓</span> Submit Entry
        </button>
        <button type="button" class="btn-secondary" @click="goToDashboard">
          <span>📊</span> Go to Dashboard
        </button>
      </div>
    </form>

    <p v-if="message" class="message" :class="{ 'error': message.includes('❌') }">{{ message }}</p>
  </div>
</template>

<script setup>
import axios from "axios";

import { reactive, computed, ref } from "vue";

const form = reactive({
  category: "",
  amount: null,
  date: "",
  notes: "",
});

const message = ref("");


const calculatedValue = computed(() => {
  return form.amount ? (form.amount * 1.1).toFixed(2) : "—";
});
import { useRouter } from "vue-router";
const router = useRouter();

function goToDashboard() {
  router.push("/dashboard");
}


async function handleSubmit() {
  if (!form.category || !form.amount || !form.date) {
    message.value = "❌ Please fill all required fields.";
    return;
  }

  if (form.amount <= 0) {
    message.value = "❌ Amount must be greater than 0.";
    return;
  }

  const newEntry = {
    ...form,
    calculatedValue: calculatedValue.value,
  };

  try {
    const res = await axios.post("http://localhost:5000/api/entries", newEntry);
    console.log("✅ Sent to backend:", res.data);
    message.value = "✅ Entry submitted successfully!";


    form.category = "";
    form.amount = null;
    form.date = "";
    form.notes = "";
  } catch (err) {
    console.error(err);
    message.value = "❌ Failed to submit entry.";
  }
}



</script>

<style scoped>
* {
  box-sizing: border-box;
}

.form-container {
  max-width: 520px;
  margin: 3rem auto;
  padding: 2.5rem;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(59, 130, 246, 0.15);
  border: 1px solid rgba(147, 197, 253, 0.3);
}

.form-header {
  text-align: center;
  margin-bottom: 2rem;
}

.form-header h2 {
  color: #0c4a6e;
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  letter-spacing: -0.5px;
}

.subtitle {
  color: #0369a1;
  font-size: 0.95rem;
  margin: 0;
  opacity: 0.85;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  color: #075985;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

input, select, textarea {
  width: 100%;
  padding: 0.85rem 1rem;
  border: 2px solid #bae6fd;
  border-radius: 10px;
  font-size: 1rem;
  background: white;
  color: #0c4a6e;
  transition: all 0.3s ease;
  font-family: inherit;
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: #38bdf8;
  box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.1);
}

input::placeholder, textarea::placeholder {
  color: #94a3b8;
}

textarea {
  resize: vertical;
  min-height: 100px;
}

.calc-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  border-radius: 12px;
  border: 2px solid #93c5fd;
  margin-top: 0.5rem;
}

.calc-label {
  font-weight: 600;
  color: #075985;
  font-size: 0.95rem;
}

.calc-value {
  font-size: 1.3rem;
  font-weight: 700;
  color: #0369a1;
  background: white;
  padding: 0.3rem 0.9rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(3, 105, 161, 0.1);
}

.button-group {
  display: flex;
  gap: 0.8rem;
  margin-top: 1rem;
}

button {
  flex: 1;
  padding: 0.9rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

button span {
  font-size: 1.1rem;
}

.btn-primary {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
}

.btn-primary:active {
  transform: translateY(0);
}

.btn-secondary {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
}

.btn-secondary:hover {
  background: linear-gradient(135deg, #059669 0%, #047857 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
}

.btn-secondary:active {
  transform: translateY(0);
}

.message {
  margin-top: 1.5rem;
  text-align: center;
  padding: 1rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.95rem;
  background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
  color: #065f46;
  border: 2px solid #6ee7b7;
  animation: slideIn 0.3s ease;
}

.message.error {
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  color: #991b1b;
  border: 2px solid #fca5a5;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 600px) {
  .form-container {
    margin: 1.5rem;
    padding: 1.5rem;
  }

  .button-group {
    flex-direction: column;
  }

  button {
    width: 100%;
  }
}
</style>