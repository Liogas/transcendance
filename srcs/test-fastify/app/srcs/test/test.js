
const baseUrl = 'http://localhost:3000';


async function runTest()
{
    try
    {
        const testLogin = await fetch(`${baseUrl}/login`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ login: 'lolo', email: 'lolo@example.com', password: '1235'})
        });
        console.log('POST /login =>', await testLogin.json());
    } catch (err)
    {
        console.error('Fetch error', err);
        Process.exit(1);
    }
}

runTest();