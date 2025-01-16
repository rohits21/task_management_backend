module.exports = {
    apps: [
        {
            name: 'tasks_api_2', // Application name
            script: 'dist/main.js', // Entry point of the application
            instances: 4, // Number of instances (use 'max' for all available CPU cores)

            exec_mode: 'cluster', // Enable cluster mode for better performance
            watch: true, // Set to true if you want PM2 to restart the app on file changes
            "ignore_watch": [
                ".git",
                "logs",
                "node_modules",
                "*.log",
                ".*",
                ".git/*",
            ],
            min_uptime: "30s",
            max_restarts: 30,
            max_memory_restart: '512M', // Restart the app if it exceeds 512 MB of memory usage
            env: {
                NODE_ENV: 'development', // Environment variables for development
            },
            env_production: {
                NODE_ENV: 'production', // Environment variables for production
            },
            log_date_format: 'YYYY-MM-DD HH:mm:ss', // Format for log timestamps
            error_file: './logs/error.log', // File to store error logs
            out_file: './logs/output.log', // File to store standard output logs
            merge_logs: true, // Combine logs from all instances
            autorestart: true, // Automatically restart the app on crash
            restart_delay: 1000, // Delay between restarts (in milliseconds)
        },
    ],
};
