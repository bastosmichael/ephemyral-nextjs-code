import { CRUDPage } from "@/components/dashboard/reusable/crud-page";
import EditInstructionForm from "@/components/instructions/edit-instruction-form";
import { NotFound } from "@/components/utility/not-found";
import { getInstructionById } from "@/db/queries/instructions-queries";

// Ensure this file doesn't revalidate the data
export const revalidate = 0;

// Define the type for the expected `params`
type EditInstructionPageProps = {
  params: {
    id: string;
  };
};

// Fixing the function signature
export default async function EditInstructionPage({
  params,
}: EditInstructionPageProps) {
  const instruction = await getInstructionById(params.id);

  // Handle cases where the instruction isn't found
  if (!instruction) {
    return <NotFound message="Instruction not found" />;
  }

  // Render the edit form
  return (
    <CRUDPage
      pageTitle="Edit instruction"
      backText="Back to instructions"
      backLink=".."
    >
      <EditInstructionForm instruction={instruction} />
    </CRUDPage>
  );
}
