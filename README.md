
<h1>📚 Assignment Submission Portal</h1>
<p>
  This project is an <strong>Assignment Submission Portal</strong> built using <strong>Node.js</strong> and <strong>Express</strong> with <strong>MongoDB</strong> as the database. The portal allows users to upload assignments and provides a dashboard for admins to accept or reject submissions.
</p>

<h2>📋 Features</h2>
<ul>
  <li><strong>User Authentication</strong>: Register and login as <strong>User</strong> or <strong>Admin</strong>.</li>
  <li><strong>Assignment Submission</strong>: Users can upload assignments tagged to specific admins.</li>
  <li><strong>Admin Dashboard</strong>: Admins can view assignments submitted to them and can accept or reject assignments.</li>
  <li><strong>JWT Authentication</strong>: Secure user authentication using <strong>JSON Web Tokens (JWT)</strong>.</li>
  <li><strong>Role-based Access</strong>: Access control implemented based on user roles (<code>user</code> or <code>admin</code>).</li>
</ul>

<h2>🛠️ Tech Stack</h2>
<ul>
  <li><strong>Backend</strong>: Node.js, Express.js</li>
  <li><strong>Database</strong>: MongoDB</li>
  <li><strong>Authentication</strong>: JWT (JSON Web Token)</li>
  <li><strong>API Testing</strong>: Postman or any API client</li>
</ul>

<h2>📂 Project Structure</h2>
<pre>
📁 assignment-portal
├── 📁 controllers
│   ├── admin-controllers.js
│   └── user-controllers.js
├── 📁 db
│   └── connection.js
├── 📁 middlewares
│   └── auth-middleware.js
├── 📁 models
│   ├── Admin.js
│   ├── Assignment.js
│   └── User.js
├── 📁 routes
│   ├── index.js
│   ├── admin-routes.js
│   └── user-routes.js
├── 📁 config
│   └── db.js
├── 📁 utils
│   └── validators.js
│   └── token-manager.js
├── .env
├── app.js
├── index.js
└── package.json
</pre>

<h2>🚀 Getting Started</h2>

<h3>1. Prerequisites</h3>
<p>Ensure you have the following installed:</p>
<ul>
  <li><a href="https://nodejs.org/">Node.js</a> (v14+)</li>
  <li><a href="https://www.mongodb.com/">MongoDB</a></li>
</ul>

<h3>2. Clone the Repository</h3>
<pre>
<code>git clone https://github.com/your-username/assignment-portal.git</code>
</pre>

<h3>3. Install Dependencies</h3>
<pre><code>npm install</code></pre>

<h3>4. Run the Application</h3>
<pre><code>npm run dev</code></pre>
<p>The server will start on base URL <a href="http://localhost:3000/api/v1">http://localhost:3000/api/v1</a>.</p>

<h2>API Endpoints</h2>
<table border="1">
  <thead>
    <tr>
      <th>Endpoint</th>
      <th>Method</th>
      <th>Description</th>
      <th>Auth Required</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>/user/register</td>
      <td>POST</td>
      <td>Register a new user</td>
      <td>No</td>
    </tr>
    <tr>
      <td>/user/login</td>
      <td>POST</td>
      <td>Login as a user</td>
      <td>No</td>
    </tr>
    <tr>
      <td>/user/upload</td>
      <td>POST</td>
      <td>Upload an assignment</td>
      <td>Yes (User)</td>
    </tr>
    <tr>
      <td>/user/admins</td>
      <td>GET</td>
      <td>Fetch all admins</td>
      <td>Yes (User)</td>
    </tr>
    <tr>
      <td>/admin/register</td>
      <td>POST</td>
      <td>Register a new admin</td>
      <td>No</td>
    </tr>
    <tr>
      <td>/admin/login</td>
      <td>POST</td>
      <td>Login as an admin</td>
      <td>No</td>
    </tr>
    <tr>
      <td>/admin/assignments</td>
      <td>GET</td>
      <td>View assignments tagged to the admin</td>
      <td>Yes (Admin)</td>
    </tr>
    <tr>
      <td>/admin/assignments/:id/accept</td>
      <td>POST</td>
      <td>Accept an assignment</td>
      <td>Yes (Admin)</td>
    </tr>
    <tr>
      <td>/admin/assignments/:id/reject</td>
      <td>POST</td>
      <td>Reject an assignment</td>
      <td>Yes (Admin)</td>
    </tr>
  </tbody>
</table>

