CREATE TABLE IF NOT EXISTS "issues_to_instructions" (
	"issue_id" uuid NOT NULL,
	"instruction_id" uuid NOT NULL,
	CONSTRAINT "issues_to_instructions_issue_id_instruction_id_pk" PRIMARY KEY("issue_id","instruction_id")
);
