const BASE_URL = "https://card-studio-api.genos-center.com/";

export async function apiClient(
  path,
  body,
  customConfig = {},
  formData = null,
) {
  const headers = { "Content-Type": "application/json" };
  if (customConfig.token) {
    headers["Authorization"] = "Bearer " + customConfig.token;
  }

  const config = {
    method: customConfig.methode ? customConfig.methode : body ? "POST" : "GET",
    headers: { ...headers, ...customConfig.headers },
    body: body ? JSON.stringify(body) : formData ? formData : null,
  };

  if (formData) {
    config.body = formData;
    delete config.headers["Content-Type"];
  } 
  const response = await fetch(`${BASE_URL}${path}`, config);

  if (!response.ok) {
    let message = "Erreur API";
    try {
      const data = await response.json();
      if (data && data.message) message = data.message;
    } catch (e) {
      /* ignore json parse errors and keep generic message */
    }

    if (response.status === 401) {
      if (path && path.toLowerCase().includes("api/login_check")) { 
        throw new Error("Email ou mot de passe invalide");
      }
      throw new Error("UNAUTHORIZED");
    }

    throw new Error(message);
  }

  return response.json();
}
