# How to execute the website:

1. Open your terminal in the Admin Panel directory
2. Install all required packages. Run: 
```npm install```

3. Setup your Project ID in the file: 
```supabase/config.toml```

4. Setup your API for the Supabase Project in the file: ```Helpdesk\Admin Panel\src\integrations\supabase\client.ts```

5. To execute run in terminal: 
```npm run dev``` or ```bun run dev```

6. Open your browser and go to: ```http://localhost:8080/```

You can checkout the Admin Panel Here (Sample data is added for understanding of design) (username: admin, password: admin123): https://help-desk-admin-panel.vercel.app/

---

# How to execute the App

** Make sure you have Android Studio, Flutter and Dart installed. **

1. Open your terminal in the Executive App directory and the cd to the_executive by running:
```cd the_executive```

2. Enter your Gemini API key (on line no. 8) in the file:
```the_executive\lib\backend\gemini```

3. Now enter your bearer token or key (on line no. 25) for DeepGram API in the file :
```the_executive\lib\backend\api_requests```

4. One last time enter your same (which you used in Admin Panel) supabase credentials (on line no. 7, 8) in the file:
```the_executive\lib\backend\supabase```

5. Finally open the main.dart file and click on run button of Android Studio and run it in a browser or a virtual device.

If you want to try the app on your Android Device you can directly download it from here: https://drive.google.com/file/d/1svEEmozhtuHl1Y4WvRyZC7bNiPpnBVkR/view?usp=sharing