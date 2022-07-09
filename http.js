// http.js
const vmRegion = process.env.FLY_REGION || "local"
console.log(`Doing it from ${vmRegion}`)
export default {
    port: 3000,
    fetch(request) {
      return new Response(    `
      <html>
        <main>
          <img src="https://bun.sh/logo@2x.png" style="height: 48px;" alt="bun logo" />
          <h1>Bun On Fly.io</h1>
          <h4>Rendered at: ${new Date().toISOString()}</h4>
          <h2><span>Full request to render time: <span id="overrideme" />ms</span></h2>
          <script>
            const currentTime = new Date();
            // round trip time
            const fullTime = currentTime - window.performance.timing.requestStart;
            document.getElementById('overrideme').innerHTML = fullTime.toString();
            console.log('REPORTS', fullTime);
    
            const times = JSON.parse(localStorage.getItem('bun-edge-times-store')) ?? [];
            times.push(fullTime);
            localStorage.setItem('bun-edge-times-store', JSON.stringify(times));
            console.table(times);
          </script>
        </main>
      </html>`,
      {
        headers: {
          "Content-Type": "text/html",
        },
      }
    );
    },
  };