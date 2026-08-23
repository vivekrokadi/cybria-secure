---
title: "Critical OT/IT Infrastructure VAPT for a Kolhapur Foundry"
client: "Engineering & Foundry Company, Kolhapur"
industry: "Manufacturing"
service: "VAPT + OT Security Assessment"
outcome: "31 critical vulnerabilities remediated before exploitation."
date: "2024-07-20"
excerpt: "A major Kolhapur-based foundry with connected OT systems commissioned a comprehensive VAPT. Cybria Secure discovered 31 critical vulnerabilities including direct access paths to SCADA systems from the corporate network."
tags: ["OT Security", "VAPT", "Manufacturing", "SCADA"]
---

## Background

A large engineering and foundry company in Kolhapur had recently connected their OT (Operational Technology) systems — including SCADA and PLCs — to their corporate IT network for remote monitoring. They had no prior security assessment of the combined OT/IT environment.

## The Challenge

- OT systems never designed for internet-connected environments
- Flat network — no segmentation between corporate IT and shop floor OT
- Legacy PLCs running outdated firmware with no vendor patch support
- Production disruption risk: any testing had to be non-intrusive to live systems

## What Cybria Secure Did

**Phase 1: Passive OT Discovery**
Non-intrusive asset discovery across the OT network without sending active probes to sensitive PLCs. Mapped all connected devices, protocols (Modbus, DNP3, OPC-UA), and communication paths.

**Phase 2: IT Network VAPT**
Active penetration testing of the corporate network. Discovered a direct, unauthenticated path from the corporate WiFi network to the SCADA HMI server.

**Phase 3: OT Risk Assessment**
Assessed all PLC firmware versions, default credentials, and remote access configurations. Found 6 PLCs using default vendor credentials.

## Findings

- 31 Critical vulnerabilities across IT and OT environments
- Unauthenticated access to SCADA HMI from corporate WiFi — proof of concept demonstrated in controlled conditions
- 6 PLCs with default credentials, remotely accessible
- No network segmentation between office and shop floor

## Outcome

- Emergency network segmentation implemented within 1 week
- All PLCs credential-hardened and firmware updated where possible
- SCADA HMI isolated behind jump server with MFA
- Staff trained on OT-specific threats
- Follow-up VAPT in 90 days confirmed all critical findings remediated

## Impact

Zero production incidents since remediation. Company now has a documented OT security policy and annual VAPT schedule.