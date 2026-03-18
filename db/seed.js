async function seedDatabase(Log) {
    const count = await Log.count();
  
    if (count === 0) {
        await Log.bulkCreate([
            { date: new Date("2026-02-18T08:15"), deviceId: "Server-Backend-01", category: "info", description: "Application started successfully" },
            { date: new Date("2026-02-18T09:02"), deviceId: "DB-Server-Main", category: "info", description: "Database connection established" },
            { date: new Date("2026-02-18T10:47"), deviceId: "Router-Kyiv-Office", category: "warning", description: "Packet loss detected (3%)" },
            { date: new Date("2026-02-18T11:30"), deviceId: "Auth-Service-01", category: "error", description: "Invalid login attempt detected" },
            { date: new Date("2026-02-18T13:12"), deviceId: "Payment-Gateway", category: "info", description: "Transaction processed successfully" },
            { date: new Date("2026-02-18T14:55"), deviceId: "API-Gateway", category: "warning", description: "High response time detected" },
        
            { date: new Date("2026-02-19T07:45"), deviceId: "Server-Backend-02", category: "info", description: "Scheduled job executed" },
            { date: new Date("2026-02-19T09:20"), deviceId: "Load-Balancer-01", category: "warning", description: "CPU usage above 75%" },
            { date: new Date("2026-02-19T10:10"), deviceId: "Router-Lviv-Office", category: "info", description: "Network connection restored" },
            { date: new Date("2026-02-19T12:33"), deviceId: "Auth-Service-01", category: "error", description: "Token validation failed" },
            { date: new Date("2026-02-19T15:18"), deviceId: "Payment-Gateway", category: "warning", description: "Payment retry initiated" },
            { date: new Date("2026-02-19T17:42"), deviceId: "Monitoring-Service", category: "info", description: "Health check passed" },
        
            { date: new Date("2026-02-20T08:05"), deviceId: "Server-Backend-01", category: "warning", description: "Memory usage exceeded threshold" },
            { date: new Date("2026-02-20T09:59"), deviceId: "DB-Server-Replica", category: "info", description: "Replication completed" },
            { date: new Date("2026-02-20T11:11"), deviceId: "Router-Kharkiv-Office", category: "error", description: "Network interface down" },
            { date: new Date("2026-02-20T13:40"), deviceId: "API-Gateway", category: "info", description: "New API version deployed" },
            { date: new Date("2026-02-20T16:22"), deviceId: "Load-Balancer-02", category: "warning", description: "Traffic spike detected" },
            { date: new Date("2026-02-20T18:05"), deviceId: "Auth-Service-02", category: "info", description: "User session created" },
        
            { date: new Date("2026-02-21T07:30"), deviceId: "Server-Backend-03", category: "info", description: "System reboot completed" },
            { date: new Date("2026-02-21T09:15"), deviceId: "DB-Server-Main", category: "warning", description: "Slow query detected" },
            { date: new Date("2026-02-21T10:50"), deviceId: "Router-Odesa-Office", category: "info", description: "VPN connection established" },
            { date: new Date("2026-02-21T12:10"), deviceId: "Payment-Gateway", category: "error", description: "Payment authorization failed" },
            { date: new Date("2026-02-21T14:35"), deviceId: "Monitoring-Service", category: "warning", description: "Disk space below 20%" },
            { date: new Date("2026-02-21T16:55"), deviceId: "API-Gateway", category: "info", description: "Cache cleared successfully" },
            { date: new Date("2026-02-21T18:20"), deviceId: "Auth-Service-02", category: "info", description: "Password reset request completed" }
          ]);

      console.log("Seed data inserted");
    }
  }
  
  module.exports = seedDatabase;