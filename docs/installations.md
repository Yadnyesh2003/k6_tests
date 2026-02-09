# Installations

Welcome to the K6 Performance and Load Testing framework.  
This is going to be developed as a full-fledged API & Resource Monitoring System.  

To run this, you will need the following installations on your device. All these are open source.

---

## K6
This is the Load Testing Tool.  

Go to [K6 Installation Guide](https://grafana.com/docs/k6/latest/set-up/install-k6/) and follow the steps for installing on Windows machine, or download the MSI instead to run it.

---

## windows_exporter
Used to track the PC's resource utilization.  

Go to [windows_exporter Releases](https://github.com/prometheus-community/windows_exporter/releases) and download the latest `windows_exporter-<version>-amd64.msi` (amd64 is correct for Windows 11).

---

## nssm (Non Sucking Service Manager)
Used to run Prometheus as a Windows service to keep running 24/7, and auto-start Prometheus on boot.  

Go to [nssm Download](https://nssm.cc/download) and download the zip file present under "Latest Releases" section.

---

## Prometheus
Used for monitoring and alerting, specifically tracking time-series metrics from applications and infrastructure.  

Go to [Prometheus Download](https://prometheus.io/download/#prometheus) and download the LTS (Long Term Support) version of Prometheus zip file for Windows OS.

---

## Grafana
****TBD in future*****
