/* eslint-disable */

export const displayMap = (locations) => {
  mapboxgl.accessToken =
    "pk.eyJ1IjoiY29kZWdyYWRpZW50cyIsImEiOiJjbG11ZzJqN3AwY2IxMmtudGFvNmFhMmJkIn0.Z73tepwP1utHEHsnfzK0Yw";

  const map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/codegradients/clmugl99u02j901pfakol4ove", // style URL
    scrollZoom: false,
    //   center: [-118.113491, 34.111745], // starting position [lng, lat]
    //   zoom: 9, // starting zoom
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Create Marker
    const el = document.createElement("div");
    el.className = "marker";

    // Add Marker
    new mapboxgl.Marker({
      element: el,
      anchor: "bottom",
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
