IMA-GEN 
:- It is a React based app where you can fetch random images and the limit is set upto 15-images as of now and on clicking on these particular images you can get the description of the images.

React components used:
1. useState: This hook is used to create state variables in functional components. It allows to define and update state values.

2. useEffect: This hook allows to perform side effects in functional components. It is used to handle asynchronous data fetching and other side effects that occur after rendering.

Inside the `ImageGallery` component, it is used to fetch images from the Unsplash API when the `category` prop changes. It ensures that the API call is made after the component has rendered and updates the `images` state variable accordingly.
Inside the `ImagePage` component, it is used to fetch a single image from the Unsplash API based on the `id` parameter from the URL. It updates the `image` state variable with the fetched data.

3. useParams: This hook is provided by the `react-router-dom` library and allows to access the parameters from the URL, useParams` is used to retrieve the `id` parameter from the URL inside the `ImagePage` component.

4. BrowserRouter` is the top-level component that wraps the entire application and provides the routing functionality.
 Routes` is used to define the routes and their corresponding components.
 Route` is used to define a specific route with a path and the component to render when the path matches.

5. Link: This component is provided by the `react-router-dom` library and is used to create links between different routes in the application. In this project `Link` is used to create links to category pages and individual image pages.
