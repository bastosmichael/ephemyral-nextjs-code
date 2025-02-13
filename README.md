# Ephemyral Code

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Ephemyral Code is an AI-powered code generation tool designed to help developers ship code faster. It leverages artificial intelligence to generate pull requests based on project issues, streamlining the development process and boosting productivity.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Setup](#setup)
  - [Simple Mode Setup](#simple-mode-setup)
  - [Advanced Mode Setup](#advanced-mode-setup)
- [Usage](#usage)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [FAQ](#faq)
- [License](#license)
- [Acknowledgements](#acknowledgements)
- [Contact](#contact)

## Features

- **AI-Generated Pull Requests**: Automatically create PRs based on issue descriptions and context.
- **GitHub Integration**: Seamless connection with your GitHub repositories to manage issues more effectively.
- **Template Management**: Create and utilize templates for consistent code generation and task automation.
- **Instruction System**: Define custom instructions to guide AI-generated code outputs tailored to specific needs.
- **Machine Learning Model Adaptation**: Utilize machine learning models to modify existing code to improve performance and readability.
- **Multi-Project Support**: Manage multiple projects within a singular advanced workspace.
- **Simple and Advanced Modes**: Choose between straightforward setups or a feature-rich development environment, enabling customization according to user skill levels.
- **Real-time Code Improvement**: Use AI to analyze and suggest optimizations for existing code directly from repositories.

## Demo

Check out the latest demo of Ephemyral in action:

[![Ephemyral Demo](https://img.youtube.com/vi/VIDEO_ID/0.jpg)](https://x.com/bastosmichael/status/1813695460600844362)

## Setup

Ephemyral offers two setup modes: Simple and Advanced. Choose the one that best fits your needs.

### Simple Mode Setup

Follow these instructions to set up a simple environment that supports AI features.

1. **Clone the Repository**

   ```bash
   git clone https://github.com/bastosmichael/ephemyral-code.git
   cd ephemyral-code
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   Copy the `.env.example` to `.env.local` and fill in the respective values. Ensure you have:

   ```bash
   cp .env.example .env.local
   ```

   Required variables:

   - `NEXT_PUBLIC_APP_MODE=simple`
   - `ANTHROPIC_API_KEY=`
   - `OPENAI_API_KEY=`
   - `DATABASE_URL=`
   - `GITHUB_PAT=`

4. **Run the Application**
   ```bash
   npm run dev
   ```

### Advanced Mode Setup

For a full-fledged development environment, follow the setup instructions for Advanced Mode.

- Additional setup steps specific to enabling more complex AI features will be provided in future updates.

## Usage

To maximize productivity with Ephemyral Code, follow these steps to utilize its AI features effectively:

1. **Create a Workspace**: Start by creating a new workspace to organize your projects effectively.
2. **Add a Project**: Within your workspace, create a new project and connect it to a GitHub repository.
3. **Generate AI Suggestions**: After creating an issue in the project, utilize AI to generate code suggestions and improvements. This can be done easily through the application interface.
4. **Create an Issue**: Describe the feature or bug fix you want to implement, and let the AI generate a corresponding pull request.
5. **Review and Merge PR**: Use the AI suggestions, make necessary adjustments, and merge the pull request into your main branch.

## Deployment

To deploy Ephemyral to Vercel and utilize its AI capabilities:

1. Fork the Ephemyral repository to your GitHub account.
2. Sign up for a [Vercel account](https://vercel.com/signup) if you haven't already.
3. Click the button below to start the deployment process:

   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fbastosmichael%2Fephemyral-code-code&env=NEXT_PUBLIC_APP_MODE,ANTHROPIC_API_KEY,OPENAI_API_KEY,DATABASE_URL,GITHUB_PAT)

4. Follow the prompts to configure your deployment, ensuring all required environment variables are set. 
5. After deployment, set up your database and run migrations:

   ```bash
   npx vercel env pull .env.local
   npm run db:migrate
   ```

For more detailed deployment instructions, including advanced configurations, please refer to our [deployment guide](https://docs.ephemyral-code.ai/deployment).

## Contributing

We welcome contributions to Ephemyral! Here's how you can help:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with a clear, descriptive message.
4. Push your changes to your fork.
5. Submit a pull request to the main Ephemyral repository.

Please read our [Contribution Guidelines](CONTRIBUTING.md) for more details on our code of conduct, branch naming conventions, and pull request process.

## FAQ

**Q: How does Ephemyral generate code?**
A: Ephemyral uses advanced AI models to analyze your project structure, issue descriptions, and custom instructions to generate contextually appropriate code.

**Q: Is my code safe and private?**
A: Yes, Ephemyral takes security seriously. We do not store your code, and all processing is done securely. However, please review our privacy policy for more details.

**Q: Can I use Ephemyral with private repositories?**
A: Yes, Ephemyral supports both public and private GitHub repositories.

For more frequently asked questions, visit our [FAQ page](https://docs.ephemyral-code.ai/faq).

## License

Ephemyral is open-source software licensed under the [MIT license](LICENSE).

## Acknowledgements

Ephemyral is built using various open-source libraries and tools. A special thanks to all contributors and maintainers, including:

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Drizzle ORM](https://github.com/drizzle-team/drizzle-orm)
- [Buildware](https://github.com/mckaywrigley/buildware-ai)
- All contributors who helped enhance the AI capabilities in this project.
