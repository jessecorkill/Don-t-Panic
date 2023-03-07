export default class WP_API {
    constructor(baseURL) {
      this.baseURL = baseURL;
    }
  
    async getUsers(username, password) {
      const url = `${this.baseURL}/wp-json/wp/v2/users`;
  
      // Encode the credentials as base64
      const credentials = `${username}:${password}`;
      const encodedCredentials = btoa(credentials);
  
      // Make the request using fetch
      const response = await fetch(url, {
        headers: {
          "Authorization": `Basic ${encodedCredentials}`,
          "Mode": 'no-cors',
        }
      });
  
      // Parse the JSON response
      const data = await response.json();
  
      // Return the data
      return data;
    } 
    
    async addUser(username, password, userData) {
        const url = `${this.baseURL}/wp-json/wp/v2/users`;
        
        // Encode the credentials as base64
        const credentials = `${username}:${password}`;
        const encodedCredentials = btoa(credentials);
        
        // Create a JSON string of the user data
        //userData should be shaped like so: {"username":"jane","password":"secret","email":"jane@example.com"}
        const jsonString = JSON.stringify(userData);
      
        // Make the request using fetch
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Authorization': `Basic ${encodedCredentials}`,
            'Content-Type': 'application/json',
          },
          body: jsonString
        });
      
        // Parse the JSON response
        const data = await response.json();
      
        // Return the data
        return data;
      }
      
  

    //function to push up a modified budget

    //function to retrieve user's budget

}