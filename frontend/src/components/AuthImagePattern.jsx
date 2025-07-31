import { Code, Terminal, FileCode, Gem, ScanHeart, User2, HandHeart, User2Icon, HeartHandshake, Handshake, UserCircleIcon } from "lucide-react"
import { useEffect, useState } from "react"



const CodeBackground = ({ title, subtitle }) => {
  //const [activeIndex, setActiveIndex] = useState(0)
  //const photo = "\frontend\src\assets\730_generated.jpg";
  const [timestamp, setTimestamp] = useState(Date.now());
  // Code snippets to display in the background
  //   const codeSnippets = [
  //     `function twoSum(nums, target) {
  //   const map = new Map();
  //   for (let i = 0; i < nums.length; i++) {
  //     const complement = target - nums[i];
  //     if (map.has(complement)) {
  //       return [map.get(complement), i];
  //     }
  //     map.set(nums[i], i);
  //   }
  //   return [];
  // }`,
  //     `class ListNode {
  //   constructor(val = 0, next = null) {
  //     this.val = val;
  //     this.next = next;
  //   }
  // }

  // function reverseList(head) {
  //   let prev = null;
  //   let current = head;
  //   while (current) {
  //     const next = current.next;
  //     current.next = prev;
  //     prev = current;
  //     current = next;
  //   }
  //   return prev;
  // }`,
  //     `function isValid(s) {
  //   const stack = [];
  //   const map = {
  //     '(': ')',
  //     '{': '}',
  //     '[': ']'
  //   };

  //   for (let i = 0; i < s.length; i++) {
  //     if (s[i] in map) {
  //       stack.push(s[i]);
  //     } else {
  //       const last = stack.pop();
  //       if (map[last] !== s[i]) return false;
  //     }
  //   }

  //   return stack.length === 0;
  // }`,
  //   ]

  // Rotate through code snippets
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setActiveIndex((prev) => (prev + 1) % codeSnippets.length)
  //   }, 2000)
  //   return () => clearInterval(interval)
  // }, [codeSnippets.length])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimestamp(Date.now());
    }, 4000);

    return () => {
      clearInterval(timer);
    };
  }, []);


  return (
    <div className="hidden lg:flex flex-col items-center justify-center bg-slate-900 text-white p-12 relative overflow-hidden">
      {/* Animated code symbols in background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-[10%] left-[15%] animate-pulse">
          <HeartHandshake size={40} />
        </div>
        <div className="absolute top-[30%] left-[80%] animate-pulse delay-300">
          <HeartHandshake size={50} />
        </div>
        <div className="absolute top-[40%] right-[90%] animate-pulse delay-300">
          <HeartHandshake size={50} />
        </div>
        <div className="absolute top-[70%] left-[20%] animate-pulse delay-700">
          <HeartHandshake size={45} />
        </div>
        <div className="absolute top-[60%] left-[75%] animate-pulse delay-500">
          <Handshake size={55} />
        </div>
        <div className="absolute top-[85%] left-[45%] animate-pulse delay-200">
          <HandHeart size={55} />
        </div>
        <div className="absolute top-[15%] left-[60%] animate-pulse delay-100">
          <ScanHeart size={30} />
        </div>
        <div className="absolute top-[30%] left-[60%] animate-pulse delay-100">
          <User2 size={30} />
        </div>
        <div className="absolute top-[10%] left-[40%] animate-pulse delay-100">
          <User2Icon size={30} />
        </div>
        <div className="absolute top-[30%] right-[70%] animate-pulse delay-100">
          <Gem size={30} />
        </div>
        <div className="absolute top-[40%] left-[90%] right-[10%] animate-pulse delay-100">
          <UserCircleIcon size={30} />
        </div>


      </div>

      <div className="z-10 max-w-md flex flex-col items-center">
        {/* Code editor mockup */}
        {/* <div className="App">
          <h1></h1>
          <img id="imgHome" src="assets/730_generated.jpg" alt="random"></img>
        </div> */}

        {/* Logo */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-primary/10  flex items-center justify-center">
            <Code className="w-6 h-6 text-primary" />

          </div>
        </div>

        {/* Text content */}
        <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>
        <p className="text-slate-300 text-center">{subtitle}</p>
      </div>
    </div>
  )
}

export default CodeBackground