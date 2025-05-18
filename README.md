# Citizen Complaints and Engagement System

## 🌍 Overview

The Citizen Engagement System is a Minimum Viable Product (MVP) built for a hackathon, focusing on improving how Rwandan citizens submit complaints or feedback about public services. The system automates routing submissions to the appropriate government agency and allows citizens to track the status of their tickets.

## 🌐 Live Demo 

https://citizens-complaints.vercel.app/

## How it works

https://youtube.com/

## 🔧 Features

### ✉️ Citizen Submission Portal

* Submit complaints or feedback via a simple, mobile-friendly web form
* Fields: Name, Phone, Email (optional), Province, District, Sector, Category, Message, Attachment
* Categories route complaints to specific government agencies (see Routing Table)
* Generates a unique Ticket ID per complaint

### ♻️ Categorization & Automated Routing

* Based on selected category, submission is routed to the appropriate agency:

  | Category               | Agency          |
  | ---------------------- | --------------- |
  | Roads & Infrastructure | RTDA            |
  | Electricity            | REG             |
  | Water & Sanitation     | WASAC           |
  | Identity Issues        | NIDA            |
  | Health                 | MINISANTE       |
  | Immigration            | DGIE            |
  | Local Services         | District Office |
  | Education              | MINEDUC         |

### 🔎 Status Tracking

* Citizens can track ticket status using the unique Ticket ID, but as this is a mockup-based MVP, tracking is only functional for pre-existing sample tickets included in the mock data:

* RW-12345678-0001
* RW-12345678-0002
* RW-12345678-0003
* RW-12345678-0004
* RW-12345678-0005
* RW-12345678-0006
* RW-12345678-0007
* RW-12345678-0008

* Displays: Category, Submission Date, Assigned Agency, Status, Response

### 📅 Admin Dashboard

* Admin login for government agencies
* Filter by location, category, and status
* Respond to citizen and change ticket status (Pending, In Progress, Resolved)


## ⚖️ Tech Stack

* **Frontend:** Typescript
* **Backend:** Not developed
* **Database:** Not implemented
* **Hosting:** Vercel

## ✅ How to Run

1. Clone the project using this link https://github.com/Moussassoss/citizens-complaints.git
2. Open the project in your IDE
3. Install all the packages using npm install
4. run npm run dev to start the project

## 📚 License

This project is built for educational and demonstration purposes for the Tech Associates Hackathon.

## 📍 Contact

Built by Moussa Mahamat Nassour
https://www.linkedin.com/in/moussa-mahamat-nassour-405104264
