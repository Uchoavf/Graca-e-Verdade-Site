export default function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="light"){document.documentElement.classList.add("light")}else if(t==="dark"){document.documentElement.classList.add("dark")}else if(matchMedia("(prefers-color-scheme:dark)").matches){document.documentElement.classList.add("dark")}}catch(e){}})()`,
      }}
    />
  );
}
