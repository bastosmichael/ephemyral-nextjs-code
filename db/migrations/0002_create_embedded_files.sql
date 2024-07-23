CREATE TABLE IF NOT EXISTS "embedded_files" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"project_id" uuid NOT NULL,
	"embedded_branch_id" uuid NOT NULL,
	"github_repo_full_name" text NOT NULL,
	"path" text NOT NULL,
	"content" text,
	"token_count" integer NOT NULL,
	"embedding" vector(256),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
