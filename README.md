# SensorViz Pro

This is a Next.js application created in Firebase Studio for visualizing sensor data.

## Getting Started Locally

Follow these instructions to get the project running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 20 or later recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- A Git client

### 1. Clone the Repository

First, clone your GitHub repository to your local machine:

```bash
git clone <your-github-repository-url>
cd <your-repository-name>
```

### 2. Install Dependencies

Install all the necessary packages using npm:

```bash
npm install
```

### 3. Set Up Environment Variables

This project may use Genkit for AI features, which requires an API key for the Gemini models.

1.  Create a copy of the example environment file:

    ```bash
    cp .env.local.example .env.local
    ```

2.  Open the newly created `.env.local` file in a text editor.

3.  Obtain an API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

4.  Add your API key to the `.env.local` file:

    ```
    GEMINI_API_KEY=your_api_key_here
    ```

### 4. Run the Development Server

Once the dependencies are installed and environment variables are set, you can start the Next.js development server:

```bash
npm run dev
```

This will start the application in development mode with Turbopack for faster performance.

### 5. Open the Application

Open your web browser and navigate to [http://localhost:9002](http://localhost:9002).

You should now see the application running locally! Any changes you make to the code on your local machine will be reflected instantly in the browser.