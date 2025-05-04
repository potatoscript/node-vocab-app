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

The `Illegal instruction` error when running `mongod` typically means:

> ❌ The MongoDB binary is **not compatible** with your system — usually due to CPU incompatibility or trying to run a server build in WSL without proper support (like AVX or systemd).

---

## ✅ Best Way to Use MongoDB in WSL

### 🚀 Option 1: **Use Docker for MongoDB (Recommended)**

Since you're already using WSL and Docker Desktop is installed, you can run MongoDB easily this way:

```bash
docker run -d --name mongo \
  -p 27017:27017 \
  -v mongo-data:/data/db \
  mongo:7
```

This:

* Runs MongoDB in a container
* Maps port 27017
* Stores your data in a volume called `mongo-data`

You can then connect from your Node.js app to:

```
mongodb://localhost:27017
```

💡 To stop the container:

```bash
docker stop mongo
```

To start again:

```bash
docker start mongo
```

---

### 🧯 Option 2: Remove incompatible install and try older version

If you insist on installing MongoDB directly in WSL, you might try MongoDB **4.4** instead of 7.0, but this is **not recommended** for new projects. Docker is much easier and avoids CPU and systemd issues.

---

## ✅ To Fix This: Enable WSL Integration in Docker Desktop

1. Open **Docker Desktop** on Windows.

2. Go to:

   ```
   ⚙️ Settings > Resources > WSL Integration
   ```

3. In the list of distros, **enable Ubuntu** (toggle it ON).

4. Click **Apply & Restart**.

5. Back in WSL (Ubuntu), run:

   ```bash
   docker --version
   ```

   If it returns something like:

   ```
   Docker version 24.x.x, build ...
   ```

   ✅ You're ready to go!

6. Now try again:

   ```bash
docker run -d --name mongo \
  -p 27017:27017 \
  -v mongo-data:/data/db \
  mongo:4.4
   ```

---

## ✅ Fix: Add your user to the `docker` group

Run this command **once** in WSL:

```bash
sudo usermod -aG docker $USER
```

Then, **restart your WSL Ubuntu session** completely (important!):

1. Close your Ubuntu terminal.
2. Open a **new Ubuntu terminal**.

Now try again:

```bash
docker run -d --name mongo \
  -p 27017:27017 \
  -v mongo-data:/data/db \
  mongo:4.4
```

If successful, you’ll see a container ID like:

```
4fa1ac2b... (etc)
```

---

Want to test if MongoDB is working? Run:

```bash
docker exec -it mongo mongosh
```



