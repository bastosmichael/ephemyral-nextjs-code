CREATE TABLE IF NOT EXISTS "issues" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"project_id" uuid NOT NULL,
	"name" text NOT NULL,
	"content" text NOT NULL,
	"status" text DEFAULT 'ready' NOT NULL,
	"runner" text,
	"pr_link" text,
	"pr_branch" text,
	"plan_response" text,
	"code_gen_response" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
