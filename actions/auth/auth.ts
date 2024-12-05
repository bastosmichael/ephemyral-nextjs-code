export async function getUserId() {
    if (IS_SIMPLE_MODE) {
      return SIMPLE_USER_ID
    }
    throw new Error("User not authenticated")
  }
