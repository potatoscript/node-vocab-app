## 🧰 Install WSL 2 (Ubuntu) on PC:

### 1. **Install WSL (but not Ubuntu yet)**  
Open PowerShell as Administrator:
```powershell
wsl --install
```
> This installs WSL 2 but don't install Ubuntu from the Microsoft Store yet — that puts it on C:.

---

### 2. **Download Ubuntu Appx Package (Manual Install)**

1. Go to the [Ubuntu releases on Microsoft's site](https://aka.ms/wslubuntu2204).
2. Download the `.appx` file (or `.msixbundle`).

For example, for Ubuntu 22.04 LTS:
- Direct link: `https://aka.ms/wslubuntu2204` (opens download)

---

### 3. **Rename the File to .zip and Extract It**

After downloading, rename it:

```
Ubuntu.appx → Ubuntu.zip
```

Then extract it (right-click → "Extract All...") into your **G:\UbuntuWSL** or another folder you create on G:.

---

### 4. **Register Ubuntu on G: Drive**

Open PowerShell as Administrator and run:

```powershell
cd "G:\UbuntuWSL"
.\ubuntu.exe
```

> This will launch Ubuntu and ask you to set your **username** and **password**.

Now it's installed **entirely on G:**, not on C:.

---

### 5. **Create a Shortcut for Ubuntu on G:**
You can right-click on `ubuntu.exe` → Create Shortcut and place it on Desktop or Start Menu.

---

### 🎉 Done! Now Ubuntu WSL is installed on your G: drive!

You can now install Node.js, npm, MongoDB, etc., inside this Ubuntu system — and your C: drive remains untouched.

---

## 🧰 Set up Your Node.js Environment Inside Ubuntu

Now you're inside Ubuntu. Continue as if it's a real Linux system:

### 1. **Update and Install Tools**

```bash
sudo apt update
sudo apt upgrade
```

### 2. **Install Node.js and npm**

Install using Node Version Manager (recommended):

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
source ~/.bashrc
nvm install node
```

Verify:

```bash
node -v
npm -v
```

### 3. **Install MongoDB**

Use this for local MongoDB:

```bash
sudo apt install mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

Or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for a free cloud version.

---

## 🧪 Test: Create a Project

```bash
mkdir japanese-vocab
cd japanese-vocab
npm init -y
npm install express mongoose
```

You can now build your Node.js app just like on a regular Ubuntu machine.

---

## 🖥️ Option 2: Use a Virtual Machine (VM)

If you prefer a full Ubuntu desktop GUI:

* Install [VirtualBox](https://www.virtualbox.org/)
* Download an Ubuntu ISO
* Create a VM and install Ubuntu inside it

But for web apps, **WSL is faster and easier**.

---

## ✅ Install MongoDB properly on Ubuntu (in WSL)

### Step 1: Import MongoDB’s public GPG key

```bash
wget -qO - https://pgp.mongodb.com/server-7.0.asc | sudo tee /etc/apt/trusted.gpg.d/mongodb.asc
```

### Step 2: Add MongoDB APT repository (for Ubuntu 22.04, replace if using another version)

```bash
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
```

### Step 3: Update and install

```bash
sudo apt update
sudo apt install -y mongodb-org
```

---

## ✅ Start MongoDB manually in WSL

Once installed:

```bash
sudo mongod --dbpath ~/data/db
```

If `~/data/db` doesn’t exist, create it first:

```bash
mkdir -p ~/data/db
```

This will start MongoDB in the foreground.

> 🛠️ Want to run it in background? You can use:

```bash
nohup mongod --dbpath ~/data/db --bind_ip 127.0.0.1 > mongodb.log 2>&1 &
```

---




