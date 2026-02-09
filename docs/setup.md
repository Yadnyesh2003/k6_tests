# Setup of Required Installations

Read through this and follow exact step by step process to setup each of the installed applications.

## k6 setup instructions:

Open `cmd` and `run it as administrator` and do:

```bash
winget install k6 --source winget
```
If you downloaded `msi` file, then simply install it.

This will install k6.  

Verify installation by running:

```bash
k6 version
```

This should give the current installed version of k6.

## Prometheus setup instructions:

1. Create a new folder named `prometheus` in `C:\`
2. Extract the downloaded Prometheus zip file in `C:\prometheus`
3. Expected folder structure after unzipping in `C:\prometheus`
```bash
# Command to print the folder structure
tree /f
```
```bash
# Expected Output:
Folder PATH listing for volume Windows
Volume serial number is 66AB-C81D
C:.
└───prometheus-3.5.1.windows-amd64
    │   LICENSE
    │   NOTICE
    │   prometheus.exe
    │   prometheus.yml
    │   promtool.exe
    │
    └───data
```

**Note:** To store Prometheus output data, create a folder named `data` inside `C:\prometheus\prometheus-3.5.1.windows-amd64`.

4. To start Prometheus, go to `C:\prometheus\prometheus-3.5.1.windows-amd64`, open cmd, and run:

```bash
prometheus.exe
```

5. Go to [http://localhost:9090/](http://localhost:9090/) to view Prometheus Dashboard.  
6. To run Prometheus as a Windows service, follow nssm installation instructions below. Stop any running `prometheus.exe` first.

## windows_exporter setup instructions:

1. Right-click the downloaded MSI file → Properties → click "Unblock" → Apply → OK. Skip if "Unblock" is not present.  
2. Double-click the MSI to install.  
3. During installation, select collectors. Recommended:

```text
cpu, logical_disk, net, os, system, memory
```

4. Keep the rest as default in GUI and proceed with installation.  
5. Click Finish to complete the installation.  
6. Add the windows_exporter to Prometheus's `prometheus.yml`:

```yaml
# Scrape windows_exporter
- job_name: "windows_exporter"
  static_configs:
    - targets: ["localhost:9182"]
      labels:
        app: "windows_exporter"
```

7. Verify:  
   - Go to [http://localhost:9182/metrics](http://localhost:9182/metrics), you should see lines like `windows_cpu_time_total`, `windows_memory_available_bytes`.  
   - In Prometheus, query:

```bash
up{job="windows_exporter"}
```

Expected result: 1.

## nssm setup instructions:

1. Extract the downloaded nssm zip file (anywhere, preferably Downloads).  
2. Go to `Win64` folder, copy `nssm.exe`.  
3. Paste `nssm.exe` into `C:\Windows\System32`.  
4. `Optional:` Delete nssm zip and extracted files. (No longer required.)

**Note:** `nssm.exe` must be in `C:\Windows\System32`.

5. Open `cmd as administrator` and run:

```bash
nssm install Prometheus
```

A GUI window will open.  

In the GUI:

- **Path:** 
```bash
C:\prometheus\prometheus-3.5.1.windows-amd64\prometheus.exe
```
- **Startup directory:** 
```bash
C:\prometheus\prometheus-3.5.1.windows-amd64
```
- **Arguments:** 
```bash
--config.file=C:\prometheus\prometheus-3.5.1.windows-amd64\prometheus.yml --web.enable-remote-write-receiver
``` 

**Optional Details Tab:**  
- Display Name: Prometheus  
- Description: Prometheus Monitoring Server  

Click **Install Service**.  

Expected output:

```bash
C:\Windows\System32>nssm install Prometheus
Service "Prometheus" installed successfully!
```

6. If Prometheus was running in cmd, stop it. Then start service:

```bash
nssm start Prometheus
```

7. Verify:  
   - Option A: Visit [http://localhost:9090](http://localhost:9090) → Prometheus UI should appear.  
   - Option B: Press Win + R → type `services.msc` → hit Enter → check Prometheus status (should show Running).
