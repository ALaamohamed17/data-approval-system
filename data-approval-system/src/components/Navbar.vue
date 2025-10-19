<template>
  <nav class="navbar">
    <div class="logo-container">
      <div class="logo-icon">📋</div>
      <h1 class="logo">Data Approval System</h1>
    </div>
    <div class="links">
      <router-link to="/submit" class="link">
        <span class="link-icon">➕</span>
        <span class="link-text">Submit</span>
      </router-link>
      <router-link to="/dashboard" class="link">
        <span class="link-icon">📊</span>
        <span class="link-text">Dashboard</span>
      </router-link>
      <router-link to="/approval" class="link">
        <span class="link-icon">✓</span>
        <span class="link-text">Approval</span>
      </router-link>
    </div>
  </nav>
</template>

<script setup>
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #0c4a6e 0%, #075985 100%);
  color: white;
  padding: 1.2rem 2.5rem;
  box-shadow: 0 4px 20px rgba(12, 74, 110, 0.3);
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 3px solid #0369a1;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.logo-icon {
  font-size: 1.8rem;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.logo {
  font-size: 1.4rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.5px;
  background: linear-gradient(135deg, #ffffff 0%, #e0f2fe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.links {
  display: flex;
  gap: 0.5rem;
}

.link {
  color: white;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  padding: 0.7rem 1.3rem;
  border-radius: 10px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
}

.link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.link:hover::before {
  left: 100%;
}

.link-icon {
  font-size: 1.1rem;
  transition: transform 0.3s ease;
}

.link-text {
  font-weight: 600;
}

.link:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.link:hover .link-icon {
  transform: scale(1.2);
}

.router-link-active {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  border-color: #60a5fa;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
  font-weight: 700;
}

.router-link-active .link-icon {
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

@media (max-width: 768px) {
  .navbar {
    padding: 1rem 1.5rem;
    flex-direction: column;
    gap: 1rem;
  }

  .logo-container {
    justify-content: center;
  }

  .logo {
    font-size: 1.2rem;
  }

  .links {
    width: 100%;
    justify-content: center;
    gap: 0.5rem;
  }

  .link {
    flex: 1;
    justify-content: center;
    padding: 0.6rem 0.8rem;
    font-size: 0.85rem;
  }

  .link-text {
    display: none;
  }

  .link-icon {
    font-size: 1.3rem;
  }
}

@media (max-width: 480px) {
  .links {
    flex-direction: column;
    width: 100%;
  }

  .link {
    width: 100%;
  }

  .link-text {
    display: inline;
  }
}
</style>
