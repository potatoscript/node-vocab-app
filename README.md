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

## 🎉 Done! Now Ubuntu WSL is installed on your G: drive!

You can now install Node.js, npm, MongoDB, etc., inside this Ubuntu system — and your C: drive remains untouched.

---
