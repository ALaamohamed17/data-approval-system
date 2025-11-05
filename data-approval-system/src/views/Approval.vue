<template>
  <div class="approval">
    <div class="approval-header">
      <h2>Approval Panel</h2>
      <p class="subtitle">Review and approve pending submissions</p>
      <div class="pending-count" v-if="pendingEntries.length">
        <span class="count-badge">{{ pendingEntries.length }}</span>
        <span class="count-label">Pending Review</span>
      </div>
    </div>

    <div class="table-container" v-if="pendingEntries.length">
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Calculated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(entry, index) in pendingEntries" :key="index">
            <td class="category-cell">{{ entry.category }}</td>
            <td class="amount-cell">{{ entry.amount }}</td>
            <td>{{ entry.date }}</td>
            <td class="calculated-cell">{{ entry.calculatedValue }}</td>
            <td class="actions-cell">
              <button class="approve" @click="approveEntry(index)">
                <span>✓</span> Approve
              </button>
              <button class="reject" @click="rejectEntry(index)">
                <span>✕</span> Reject
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="no-pending">
      <div class="success-icon">🎉</div>
      <p class="success-message">All caught up!</p>
      <p class="success-subtitle">No pending entries to review</p>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";

import { ref, onMounted } from "vue";



const pendingEntries = ref([]);

onMounted(async () => {
  const res = await axios.get("http://localhost:5000/api/entries");
  pendingEntries.value = res.data.filter((e) => e.status === "Pending");
});


async function approveEntry(index) {
  const id = pendingEntries.value[index].id;
  try {
    await axios.put(`http://localhost:5000/api/entries/${id}/approve`);
    alert("✅ Entry approved!");
    pendingEntries.value.splice(index, 1);
  } catch (err) {
    console.error(err);
  }
}

async function rejectEntry(index) {
  const id = pendingEntries.value[index].id;
  const reason = prompt("Enter rejection reason (optional):");
  try {
    await axios.put(`http://localhost:5000/api/entries/${id}/reject`, { reason });
    alert("❌ Entry rejected!");
    pendingEntries.value.splice(index, 1);
  } catch (err) {
    console.error(err);
  }
}


</script>

<style scoped>
.approval {
  max-width: 1100px;
  margin: 2rem auto;
  padding: 2.5rem;
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(245, 158, 11, 0.15);
  border: 1px solid rgba(252, 211, 77, 0.4);
}

.approval-header {
  text-align: center;
  margin-bottom: 2rem;
}

.approval-header h2 {
  color: #78350f;
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  letter-spacing: -0.5px;
}

.subtitle {
  color: #92400e;
  font-size: 0.95rem;
  margin: 0 0 1.5rem 0;
  opacity: 0.85;
}

.pending-count {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  background: white;
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(146, 64, 14, 0.15);
  border: 2px solid #fcd34d;
}

.count-badge {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 10px rgba(245, 158, 11, 0.4);
}

.count-label {
  color: #78350f;
  font-weight: 600;
  font-size: 1rem;
}

.table-container {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: linear-gradient(135deg, #78350f 0%, #92400e 100%);
}

th {
  padding: 1rem;
  text-align: left;
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 3px solid #b45309;
}

tbody tr {
  border-bottom: 1px solid #fef3c7;
  transition: all 0.2s ease;
}

tbody tr:hover {
  background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
  transform: scale(1.01);
}

tbody tr:last-child {
  border-bottom: none;
}

td {
  padding: 1rem;
  color: #78350f;
  font-size: 0.95rem;
}

.category-cell {
  font-weight: 600;
  color: #92400e;
}

.amount-cell {
  font-weight: 600;
  color: #78350f;
}

.calculated-cell {
  font-weight: 700;
  color: #b45309;
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
}

.actions-cell {
  display: flex;
  gap: 0.6rem;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

button {
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
}

button span {
  font-size: 1rem;
  font-weight: 700;
}

.approve {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
}

.approve:hover {
  background: linear-gradient(135deg, #059669 0%, #047857 100%);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(16, 185, 129, 0.4);
}

.approve:active {
  transform: translateY(0);
}

.reject {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
}

.reject:hover {
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(239, 68, 68, 0.4);
}

.reject:active {
  transform: translateY(0);
}

.no-pending {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.success-icon {
  font-size: 5rem;
  margin-bottom: 1.5rem;
  animation: bounce 1s ease infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.success-message {
  color: #78350f;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
}

.success-subtitle {
  color: #92400e;
  font-size: 1rem;
  opacity: 0.8;
  margin: 0;
}

@media (max-width: 768px) {
  .approval {
    margin: 1rem;
    padding: 1.5rem;
  }

  .approval-header h2 {
    font-size: 1.5rem;
  }

  .table-container {
    overflow-x: auto;
  }

  table {
    min-width: 700px;
  }

  .actions-cell {
    flex-direction: column;
    gap: 0.5rem;
  }

  button {
    width: 100%;
    justify-content: center;
  }
}
</style>
