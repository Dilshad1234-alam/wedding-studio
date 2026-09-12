
async function testSave() {
  const landingConfig = {
    badge: "TEST",
    servicesPillars: [
      {
        title: "Test Destination Wedding",
        desc: "This is a test",
        image: "https://example.com/test.jpg",
        link: "/test"
      }
    ]
  };

  const res = await fetch('http://localhost:3000/api/landing', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(landingConfig)
  });

  const json = await res.json();
  console.log(json);
}

testSave();
