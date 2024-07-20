# Ephemyral

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/bastosmichael/ephemyral-ai.svg)](https://github.com/bastosmichael/ephemyral-ai/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/bastosmichael/ephemyral-ai.svg)](https://github.com/bastosmichael/ephemyral-ai/issues)

Ephemyral is an advanced AI-powered code generation tool designed to revolutionize the development process. It leverages artificial intelligence to generate pull requests based on project issues, streamlining workflows and significantly boosting developer productivity.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Technologies](#technologies)
- [Setup](#setup)
  - [Simple Mode Setup](#simple-mode-setup)
  - [Advanced Mode Setup](#advanced-mode-setup)
- [Usage](#usage)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [FAQ](#faq)
- [License](#license)
- [Acknowledgements](#acknowledgements)
- [Roadmap](#roadmap)
- [Support](#support)
- [Contact](#contact)

## Features

- **AI-Generated Pull Requests**: Automatically create PRs based on issue descriptions.
- **GitHub Integration**: Seamless connection with your GitHub repositories.
- **Template Management**: Create and use templates for consistent code generation.
- **Instruction System**: Define custom instructions to guide AI-generated code.
- **Multi-Project Support**: Manage multiple projects within a single workspace.
- **Simple and Advanced Modes**: Choose between a straightforward setup or a feature-rich environment.
- **Workspace Organization**: Efficiently manage multiple projects and teams.
- **Linear Integration**: Connect with Linear for enhanced project management (Advanced Mode).
- **Customizable AI Models**: Support for various AI models including Claude and GPT.
- **Embedded File Search**: Intelligent codebase search for context-aware code generation.
- **Real-time Collaboration**: Work together seamlessly on projects and issues.

## Demo

Check out the latest demo of Ephemyral in action:

[![Ephemyral Demo](https://img.youtube.com/vi/VIDEO_ID/0.jpg)](https://x.com/bastosmichael/status/1813695460600844362)

## Technologies

Ephemyral is built using a modern tech stack, including:

- **Next.js**: React framework for server-side rendering and static site generation.
- **TypeScript**: Typed superset of JavaScript for improved developer experience.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Drizzle ORM**: TypeScript ORM for SQL databases.
- **Clerk**: Authentication and user management.
- **Anthropic Claude**: AI model for code generation.
- **OpenAI**: Used for text embeddings and additional AI capabilities.
- **GitHub API**: For repository and PR management.
- **Linear SDK**: Project management integration (Advanced Mode).
- **Vercel**: Deployment and hosting platform.

## Setup

Ephemyral offers two setup modes: Simple and Advanced. Choose the one that best fits your needs.

### Simple Mode Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/bastosmichael/ephemyral.git
   cd ephemyral
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   Copy the `.env.example` file to `.env.local` and fill in the required variables:

   ```bash
   cp .env.example .env.local
   ```

   Required variables for Simple Mode:

   - `NEXT_PUBLIC_APP_MODE=simple`
   - `ANTHROPIC_API_KEY=`
   - `OPENAI_API_KEY=`
   - `DATABASE_URL=`
   - `GITHUB_PAT=`

4. **Set Up the Database**
   We recommend using [Supabase](https://supabase.com/) or [Neon](https://neon.tech/) for your Postgres database.
   After setting up your database, run the migrations:

   ```bash
   npm run migrate
   ```

5. **Set Up GitHub PAT**
   Follow the instructions in the [GitHub PAT Setup Guide](#github-pat-setup-guide) to create and configure your Personal Access Token.

6. **Run the Application**
   ```bash
   npm run dev
   ```

### Advanced Mode Setup

For the Advanced Mode setup, follow the same steps as Simple Mode, but use these environment variables:

- `NEXT_PUBLIC_APP_MODE=advanced`
- `CLERK_SECRET_KEY=`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=`
- `GITHUB_CLIENT_SECRET=`
- `GITHUB_PRIVATE_KEY=`
- `NEXT_PUBLIC_GITHUB_APP_NAME=`
- `NEXT_PUBLIC_GITHUB_APP_ID=`
- `NEXT_PUBLIC_GITHUB_CLIENT_ID=`
- `LINEAR_CLIENT_SECRET=` (optional)
- `LINEAR_WEBHOOK_SECRET=` (optional)
- `NEXT_PUBLIC_LINEAR_CLIENT_ID=` (optional)

Additional setup steps for Advanced Mode:

1. Set up a Clerk account and configure your application.
2. Create a GitHub App and configure the necessary permissions.
3. (Optional) Set up a Linear account and create an application for integration.

## Usage

1. **Create a Workspace**: Start by creating a new workspace to organize your projects.

2. **Add a Project**: Within your workspace, create a new project and connect it to a GitHub repository.

3. **Create an Issue**: Describe the feature or bug fix you want to implement.

4. **Generate PR**: Click the "Run" button on the issue to generate an AI-powered pull request.

5. **Review and Merge**: Review the generated code, make any necessary adjustments, and merge the PR.

6. **Manage Templates and Instructions**: Create reusable templates and instructions to guide the AI in generating code that matches your project's standards and patterns.

7. **Collaborate**: Invite team members to your workspace and collaborate on projects and issues.

For more detailed usage instructions, please refer to our [documentation](https://docs.ephemyral.ai).

## Deployment

To deploy Ephemyral to Vercel:

1. Fork the Ephemyral repository to your GitHub account.
2. Sign up for a [Vercel account](https://vercel.com/signup) if you haven't already.
3. Click the button below to start the deployment process:

   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fbastosmichael%2Fephemyral-ai&env=NEXT_PUBLIC_APP_MODE,ANTHROPIC_API_KEY,OPENAI_API_KEY,DATABASE_URL,GITHUB_PAT)

4. Follow the prompts to configure your deployment, ensuring all required environment variables are set.
5. Once deployed, configure your database by running the migrations:
   ```bash
   npx vercel env pull .env.local
   npm run migrate
   ```

For more detailed deployment instructions, including advanced configurations, please refer to our [deployment guide](https://docs.ephemyral.ai/deployment).

## Contributing

We welcome contributions to Ephemyral! Here's how you can help:

1. Fork the repository.
2. Create a new branch for your feature or bug fix: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit them with a clear, descriptive message.
4. Push your changes to your fork: `git push origin feature/your-feature-name`.
5. Submit a pull request to the main Ephemyral repository.

Please read our [Contribution Guidelines](CONTRIBUTING.md) for more details on our code of conduct, branch naming conventions, and pull request process.

## FAQ

**Q: How does Ephemyral generate code?**
A: Ephemyral uses advanced AI models (such as Claude and GPT) to analyze your project structure, issue descriptions, and custom instructions to generate contextually appropriate code.

**Q: Is my code safe and private?**
A: Yes, Ephemyral takes security seriously. We do not store your code, and all processing is done securely. However, please review our privacy policy for more details.

**Q: Can I use Ephemyral with private repositories?**
A: Yes, Ephemyral supports both public and private GitHub repositories.

**Q: How does Ephemyral handle different programming languages?**
A: Ephemyral is designed to work with multiple programming languages and frameworks. The AI models are trained on a wide variety of codebases and can generate code for most popular languages.

**Q: Can I customize the AI-generated code to match my project's coding style?**
A: Yes, you can create custom instructions and templates to guide the AI in generating code that matches your project's specific standards and patterns.

For more frequently asked questions, visit our [FAQ page](https://docs.ephemyral.ai/faq).

## License

Ephemyral is open-source software licensed under the [MIT license](LICENSE).

## Acknowledgements

Ephemyral is built using various open-source libraries and tools. We'd like to thank the contributors and maintainers of:

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Drizzle ORM](https://github.com/drizzle-team/drizzle-orm)
- [Clerk](https://clerk.dev/)
- [Anthropic](https://www.anthropic.com/)
- [OpenAI](https://openai.com/)
- [Linear](https://linear.app/)

And all the other dependencies that make this project possible.

## Roadmap

Our future plans for Ephemyral include:

- Enhanced AI model selection and fine-tuning options
- Improved code review suggestions
- Integration with additional project management tools
- Advanced analytics and performance metrics
- Support for more version control systems beyond GitHub

We're always open to suggestions from our community. If you have ideas for new features, please open an issue or contribute to the discussion on our GitHub repository.

## Support

For support, feature requests, or general inquiries:

- Create an [issue](https://github.com/bastosmichael/ephemyral-ai/issues) on GitHub
- Join our [Discord community](https://discord.gg/ephemyral) for discussions and support
- Check out our [documentation](https://docs.ephemyral.ai) for detailed guides and tutorials

## Contact

- Follow [@bastosmichael](https://twitter.com/bastosmichael) on Twitter for updates
- Connect with [Michael Bastos](https://www.linkedin.com/in/michaelbastos/) on LinkedIn
- Email us at support@ephemyral.ai

Built with ❤️ by [Michael Bastos](https://twitter.com/bastosmichael) and [Tyler Bruno](https://twitter.com/tylerbruno05) at Takeoff AI.

---

### GitHub PAT Setup Guide

To set up your GitHub Personal Access Token (PAT) for Ephemyral:

1. Go to [GitHub's Token Settings](https://github.com/settings/tokens?type=beta).
2. Click "Generate new token" and choose "Fine-grained token".
3. Set a name and expiration for your token.
4. Under "Repository access", select either "All repositories" or specific repositories.
5. In "Permissions", grant the following:
   - Repository permissions:
     - Contents: Read and write
     - Metadata: Read-only
     - Pull requests: Read and write
6. Click "Generate token" and copy your new PAT.
7. Add the PAT to your `.env.local` file:
   ```
   GITHUB_PAT=your_pat_here
   ```

Remember to keep your PAT secure and never share it publicly.
