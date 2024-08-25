Here are 3 good ways to define function components in TypeScript:

1.)

type BodyProps = {
  posts: Post[];
};

const Body = ({ posts }: BodyProps) => {
  // component implementation
};

2.)

const Body: FC<BodyProps> = ({ posts }) => {
  // component implementation
};

3.)

function Body({ posts }: BodyProps) {
  // component implementation
}

4.)

function Header(props: BodyProps) {
  // component implementation
}

Here's and example of the fetch API:

const postData = {
    title: 'foo',
    body: 'bar',
    userId: 1,
};

fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json', // Specify the content type
    },
    body: JSON.stringify(postData), // Convert the data to a JSON string
})
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data); // Handle the response data
    })
    .catch(error => {
        console.error('Error:', error); // Handle errors
    });