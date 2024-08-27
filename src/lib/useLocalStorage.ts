
export const useLocalStorage = (key: string) => {
    // Set logged-in user function
    const setLoggedInUser = (userName: string) => {
      try {
        localStorage.setItem(key, JSON.stringify(userName))
      } catch (error) {
        console.error('Something Went Wrong', error)
      }
    };

    const getItem = () => {
      try {
        const item = localStorage.getItem(key)
        return item ? JSON.parse(item) : null
      } catch (error) {
        console.error('Something Went Wrong', error)
      }
    };
  
    return { setLoggedInUser, getItem };
  };
  