CREATE TABLE IF NOT EXISTS "templates_to_instructions" (
	"template_id" uuid NOT NULL,
	"instruction_id" uuid NOT NULL,
	CONSTRAINT "templates_to_instructions_template_id_instruction_id_pk" PRIMARY KEY("template_id","instruction_id")
);
