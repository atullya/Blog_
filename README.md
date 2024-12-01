  let res = await axios.get("/api/blog/uploadedblog", {
        withCredentials: true, // This is the correct way to include cookies in axios
      });.
