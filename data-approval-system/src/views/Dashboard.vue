<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <div class="header-content">
        <h2>Data Dashboard</h2>
        <p class="subtitle">Manage and review all submissions</p>
      </div>
      <button class="to-submit" @click="goToSubmit">
        <span>➕</span> Add New Entry
      </button>
    </div>

    <div class="filters">
      <label>Filter by Status:</label>
      <select v-model="selectedStatus">
        <option value="">All Entries</option>
        <option>Pending</option>
        <option>Approved</option>
        <option>Rejected</option>
      </select>
    </div>

    <div class="table-container" v-if="filteredEntries.length">
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
            <th>Rejection Reason</th>
            <th>Calculated (+10%)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(entry, index) in filteredEntries" :key="index">
            <td class="category-cell">{{ entry.category }}</td>
            <td class="amount-cell">{{ entry.amount }}</td>
            <td>{{ entry.date }}</td>
            <td>
              <span class="status-badge" :class="entry.status.toLowerCase()">
                {{ entry.status }}
              </span>
            </td>
            <td class="reason-cell">{{ entry.rejectionReason || "—" }}</td>
            <td class="calculated-cell">{{ entry.calculatedValue }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="no-entries">
      <div class="empty-icon">📋</div>
      <p>No entries found.</p>
      <p class="empty-subtitle">Start by adding your first entry!</p>
    </div>

    <div class="stats" v-if="filteredEntries.length">
      <h3>📊 Summary Statistics</h3>
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-label">Total Entries</div>
          <div class="stat-value">{{ filteredEntries.length }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Total Amount</div>
          <div class="stat-value">${{ totalAmount.toFixed(2) }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Average Amount</div>
          <div class="stat-value">${{ averageAmount }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";

import { ref, computed, onMounted } from "vue";

const entries = ref([]);
const selectedStatus = ref("");
import { useRouter } from "vue-router";
const router = useRouter();

function goToSubmit() {
  router.push("/submit");
}

// تحميل البيانات من localStorage
onMounted(async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/entries");
    entries.value = res.data;
  } catch (err) {
    console.error("❌ Failed to fetch entries:", err);
  }
});



// فلترة الإدخالات حسب الحالة
const filteredEntries = computed(() => {
  if (!selectedStatus.value) return entries.value;
  return entries.value.filter((e) => e.status === selectedStatus.value);
});

// حساب الإجماليات
const totalAmount = computed(() => {
  return filteredEntries.value.reduce((sum, e) => sum + e.amount, 0);
});

const averageAmount = computed(() => {
  return filteredEntries.value.length
    ? (totalAmount.value / filteredEntries.value.length).toFixed(2)
    : 0;
});
</script>

<style scoped>
.dashboard {
  max-width: 1100px;
  margin: 2rem auto;
  padding: 2.5rem;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(59, 130, 246, 0.15);
  border: 1px solid rgba(147, 197, 253, 0.3);
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1rem;
}

.header-content h2 {
  color: #0c4a6e;
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 0.3rem 0;
  letter-spacing: -0.5px;
}

.subtitle {
  color: #0369a1;
  font-size: 0.95rem;
  margin: 0;
  opacity: 0.85;
}

.to-submit {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  border: none;
  padding: 0.85rem 1.5rem;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
}

.to-submit span {
  font-size: 1.1rem;
}

.to-submit:hover {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
}

.to-submit:active {
  transform: translateY(0);
}

.filters {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.filters label {
  font-weight: 600;
  color: #075985;
  font-size: 0.95rem;
}

.filters select {
  padding: 0.6rem 1rem;
  border: 2px solid #bae6fd;
  border-radius: 8px;
  font-size: 0.95rem;
  background: white;
  color: #0c4a6e;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 150px;
}

.filters select:focus {
  outline: none;
  border-color: #38bdf8;
  box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.1);
}

.table-container {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 1.5rem;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: linear-gradient(135deg, #0c4a6e 0%, #075985 100%);
}

th {
  padding: 1rem;
  text-align: left;
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 3px solid #0369a1;
}

tbody tr {
  border-bottom: 1px solid #e0f2fe;
  transition: all 0.2s ease;
}

tbody tr:hover {
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  transform: scale(1.01);
}

tbody tr:last-child {
  border-bottom: none;
}

td {
  padding: 1rem;
  color: #0c4a6e;
  font-size: 0.95rem;
}

.category-cell {
  font-weight: 600;
  color: #0369a1;
}

.amount-cell {
  font-weight: 600;
  color: #0c4a6e;
}

.calculated-cell {
  font-weight: 700;
  color: #075985;
  background: linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%);
}

.reason-cell {
  color: #64748b;
  font-style: italic;
}

.status-badge {
  display: inline-block;
  padding: 0.4rem 0.9rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.status-badge.approved {
  background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
  color: #065f46;
  border: 2px solid #6ee7b7;
}

.status-badge.rejected {
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  color: #991b1b;
  border: 2px solid #fca5a5;
}

.status-badge.pending {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  color: #92400e;
  border: 2px solid #fcd34d;
}

.no-entries {
  text-align: center;
  padding: 3rem 1rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.3;
}

.no-entries p {
  color: #0c4a6e;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0.5rem 0;
}

.empty-subtitle {
  color: #0369a1;
  font-size: 0.95rem;
  opacity: 0.7;
}

.stats {
  margin-top: 1.5rem;
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.stats h3 {
  color: #0c4a6e;
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0 0 1.2rem 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.stat-card {
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  border: 2px solid #93c5fd;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.2);
}

.stat-label {
  color: #075985;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-value {
  color: #0c4a6e;
  font-size: 1.8rem;
  font-weight: 700;
}

@media (max-width: 768px) {
  .dashboard {
    margin: 1rem;
    padding: 1.5rem;
  }

  .dashboard-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .to-submit {
    width: 100%;
    justify-content: center;
  }

  .table-container {
    overflow-x: auto;
  }

  table {
    min-width: 700px;
  }

  .filters {
    flex-direction: column;
    align-items: flex-start;
  }

  .filters select {
    width: 100%;
  }
}
</style>