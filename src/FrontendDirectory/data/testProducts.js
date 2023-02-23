const products = [
    {
        _id: "1",
        name: "iphone 14 pro max",
        image: "https://static.toiimg.com/photo/80635304/Apple-iPhone-14-Pro-Max-512GB-6GB-RAM.jpg",
        images: [
            "https://static.toiimg.com/photo/80635304/Apple-iPhone-14-Pro-Max-512GB-6GB-RAM.jpg",
            "https://live.staticflickr.com/7898/46680455155_6da50620f4_b.jpg",
            "https://th.bing.com/th/id/OIP.3qfnTxannhQmv5mm_ItfHQHaF_?pid=ImgDet&w=557&h=451&rs=1"
        ],
        description: "1TB storage with 85% battery health.",
        price: 9590.00,
        condition: "used",
        countInStock: 3,
    },
    {
        _id: "2",
        name: "Programming Bbooks",
        image: "https://th.bing.com/th/id/OIP.bCkFEmmRXHApRYD-ey6qSAHaJ4?pid=ImgDet&rs=1",
        images: [
            "https://th.bing.com/th/id/OIP.bCkFEmmRXHApRYD-ey6qSAHaJ4?pid=ImgDet&rs=1",
            "https://th.bing.com/th/id/R.930a6b5eb30b32426c5dcc98236e3b86?rik=A85rsxH2y35sog&pid=ImgRaw&r=0",
            "https://th.bing.com/th/id/OIP.31btjbZC6TVjgMAQlHSF-QHaL2?pid=ImgDet&w=640&h=1024&rs=1",
        ],
        description: "Lorem Ipsim form the show of the ghost of the house of the hor",
        price: 88.09,
        condition: "Brand New",
        countInStock: 3,
    },
    {
        _id: "3",
        name: "Fresh Jackets",
        image: "https://th.bing.com/th/id/R.c88bbc69bbdbe3361ae416b9f1da8fb2?rik=B9nULyjMwOVT5A&pid=ImgRaw&r=0",
        images: [
            "https://th.bing.com/th/id/R.c88bbc69bbdbe3361ae416b9f1da8fb2?rik=B9nULyjMwOVT5A&pid=ImgRaw&r=0",
            "https://th.bing.com/th/id/OIP.sxtJndgfJbUZ93UwjhQjbAHaJM?pid=ImgDet&rs=1",
            "https://th.bing.com/th/id/R.fc7ee82328905d04c257cd35005a81b5?rik=sk9B1sQgtmMiVg&pid=ImgRaw&r=0"
        ],
        description: "Fresh bought from Canada. Four left with multiple colours.",
        price: 589.00,
        condition: "Brand New",
    },
    {
        _id: "4",
        name: "Alienware M17R4",
        image: "https://cdn.pickr.com.au/wp-content/uploads/2017/01/alienware-ces-17-2017-01.jpg",
        images: [
            "https://cdn.pickr.com.au/wp-content/uploads/2017/01/alienware-ces-17-2017-01.jpg",
            "https://th.bing.com/th/id/OIP.tzxEq0MXWEy8OHHq8XyJWgHaEj?pid=ImgDet&rs=1",
            "https://th.bing.com/th/id/OIP.7ub5snaWEYMlX6SFpqS1yAHaE8?pid=ImgDet&rs=1",
            "https://cdn.mos.cms.futurecdn.net/f4MWJ4bfz3AWxJKba6ymw5-1200-80.jpg",
        ],
        price: 22000.00,
        condition: "Brand New",
        ram: "32GB",
        storage: "1TB SSD",
        processor: "Intel(R) Core(TM) i9-12953 CPU @ 3.00GHz (8 CPUs), 3.00GHz",
        displaySize: "17”/17.3”",
        location: "Market Circle",
        description: "Brand New Alienware m17r4 with big storage and a very fast processor. Price is negotiable"
    },
    {
        _id: "5",
        name: "Jordan",
        image: "https://th.bing.com/th/id/R.6fc331726cb57c211e0fe1fe091160b6?rik=t%2fifS8D28QopuQ&riu=http%3a%2f%2f4.bp.blogspot.com%2f-ZYiR9fHqS0A%2fVE0YNiCJGDI%2fAAAAAAAAjEc%2f8yxDBPpQ-mQ%2fs1600%2ftumblr_ne0yp71eUs1rbgazio1_1280.jpg&ehk=pdy4j69hB1Wey8ojq8N6t5g3nLaT7IMyKTna%2fzcuBzQ%3d&risl=&pid=ImgRaw&r=0",
        images: [
            "https://th.bing.com/th/id/R.051b8b9e55e8f2b69302bbd9cd25f541?rik=FK%2fGObkjkhoPcg&pid=ImgRaw&r=0",
            "https://th.bing.com/th/id/OIP.q6YVapl-XYDgkiCPRHrKVgHaEc?pid=ImgDet&rs=1",
        ],
        description: "It's negotiable.",
        model: "Jordan 2",
        condition: "Used",
        price: 230.00,
        countInStock: 3,
    },
    {
        _id: "6",
        name: "CK Watch",
        image: "https://th.bing.com/th/id/OIP.WwA-uXi1Ua7Opq-a2_aRlQHaKU?pid=ImgDet&rs=1",
        images: [
            "https://th.bing.com/th/id/R.46a98cbaf9ca5646a6c215f444220ab0?rik=%2bvaeYGXpBH0umQ&riu=http%3a%2f%2fww1.prweb.com%2fprfiles%2f2005%2f06%2f01%2f246849%2fWatchoftheYear.gif&ehk=WN5QAXnOjh%2bAe2uChFqL62QocssaHI7Gwuh%2fnwxm%2fhQ%3d&risl=&pid=ImgRaw&r=0",
            "https://th.bing.com/th/id/R.639ca52e7119b058df00bd1d9fffeaa5?rik=7TzuSLgmAvD5mA&riu=http%3a%2f%2fwww.audemarspiguetreview.com%2fimages%2f201706%2fDevon-Tread-1-Exoskeleton-watch.jpg&ehk=nlghdDXPdw5xHkLus%2be5S%2bTj4clTl2h6agG%2b5QvQelE%3d&risl=&pid=ImgRaw&r=0",
            "https://th.bing.com/th/id/OIP.cCZ-1nubIwUmZDi0JhtW_AHaJ8?pid=ImgDet&w=762&h=1024&rs=1",
        ],
        description: "Lorem Ipsim form the show of the ghost of the house of the hor",
        price: 88.09,
        countInStock: 3,
    },
    {
        _id: "7",
        name: "Fresh Cycle",
        image: "https://th.bing.com/th/id/R.2427f2843f0312fcefcc312e5b614f6f?rik=xO4S0x08zr0KqA&pid=ImgRaw&r=0",
        images: [
            "https://th.bing.com/th/id/R.cc9e61c34eb6aa87f77421f15c10551e?rik=LiZwunr2%2ff3kHw&pid=ImgRaw&r=0",
            "https://th.bing.com/th/id/R.2427f2843f0312fcefcc312e5b614f6f?rik=xO4S0x08zr0KqA&pid=ImgRaw&r=0",
        ],
        description: "Lorem Ipsim form the show of the ghost of the house of the hor",
        price: 689.00,
        countInStock: 3,
    },
    {
        _id: "8",
        name: "Nice Cosmetics",
        image: "https://th.bing.com/th/id/OIP.IQnZAzuBfgKTkYmsvOfpzgHaGm?pid=ImgDet&rs=1",
        images: [
            "https://th.bing.com/th/id/OIP.IQnZAzuBfgKTkYmsvOfpzgHaGm?pid=ImgDet&rs=1",
            "https://th.bing.com/th/id/R.9e75e33a68aeb7c7a18c4b77cceba3e0?rik=oXWfoiu%2bCT3ZsA&pid=ImgRaw&r=0",
            "https://th.bing.com/th/id/R.5f6b838add29a6927543daecca8df7fb?rik=j9y%2bJNx1sHaxHw&pid=ImgRaw&r=0",
        ],
        description: "Lorem Ipsim form the show of the ghost of the house of the hor",
        price: 89.00,
        countInStock: 3,
    },
]

export default products;