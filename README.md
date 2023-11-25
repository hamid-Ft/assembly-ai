# gHi, I'm Hamid! 👋

## 🚀 About Me

I'm a junior react developer

## 🔗 Links

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://niklinkagency.com/projects)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/hamidft/)

## Other Common Github Profile Sections

👩‍💻 I'm currently working on admin dashboard project see [here](https://github.com/hamid-Ft/admin-dashboard)

🧠 I'm currently learning nextJs

## 🛠 Skills

WordPress dev , React , tailwind

# Voice Transcription App

![audioRecorder](image/README/1698748830121.png 'assemblyAi')

A simple web app that transcribes saved voice input using the [MediaRecorder API](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder) supported in browsers with [AssemblyAi](https://www.assemblyai.com/docs/getting-started/transcribe-an-audio-file).

This app provides users with "Start Recording" ,"Stop Recording" "Remove" and "Upload" buttons to transcribe spoken words into text.

then saving audioBlob in objectUrl and post it with axios on API then polling till req comes back successfully and shown transcribe text with sentiment-analysis , topic ,entity recognition features from [assembly Ai ](https://www.assemblyai.com/docs/getting-started/transcribe-an-audio-file).

## Table of Contents

-   [Demo](#demo)
-   [Features](#features)
-   [Prerequisites](#prerequisites)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Contributing](#contributing)
-   [License](#license)

## Features

-   **Voice Transcription:** Record your voice and get the spoken words transcribed into text.
-   **Modern Browser Support:** The app checks if the user's browser supports the [MedaiRecorder](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder) API before allowing voice transcription.
-   **Save Audio Records :** storing audio records in individual audio element with controlers.
-   **upload & delete:** have buttons for removing and uploading recorder auidos.
-   **AI Features:** transcribe audio by default and have [Sentiment Analysis](https://www.assemblyai.com/docs/models/sentiment-analysis) , [Entity Detection](https://www.assemblyai.com/docs/models/entity-detection) and [Topic Detection](https://www.assemblyai.com/docs/models/topic-detection)

## Prerequisites

Before you begin, ensure you have met the following requirements:

-   A modern web browser (e.g., Chrome, Firefox, Edge) with support for the Speech Recognition API.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/hamid-Ft/assembly-ai.git
    ```

2. Change to the project directory:

    ```bash
    cd assembly-ai
    ```

3. Install the project dependency using [npm](https://www.npmjs.com/):

    ```bash
    npm install
    ```

## Usage

1. Start the development server:

    ```bash
    npm run dev
    ```

2. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)
3. Click the "Start Recording" button to begin recording your voice.
4. Speak into your microphone, and the app will transcribe your speech in real-time.
5. Click the "Stop Recording" button to end the transcription.
6. View the transcribed text on the screen.

## Contributing

Contributions are welcome! To contribute to this project, follow these steps:

1. Fork the project.
2. Create a new branch for your feature or bug fix:

    ```bash
    git checkout -b feature/your-feature
    ```

3. Make your changes and commit them:

    ```bash
    git commit -m 'Add your feature'
    ```

4. Push your changes to your fork:

    ```bash
    git push origin feature/your-feature
    ```

5. Create a pull request in this repository.

Please ensure your code follows the project's coding standards and includes relevant tests.

## Author

-   [@hamid-Ft](https://www.github.com/hamid-Ft)

For additional information or questions, feel free to contact me:

-   Email: hamidfattahi.a@gmail.com

Enjoy exploring assembly-ai App!

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

## **Coverage Badge**

![Coverage Badge](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/hamid-Ft/3ec28d5c0281d2cd7b26bdf333e754a9/raw/assembly-ai__heads_main.json)
