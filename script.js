// THEME

const setTheme = (theme) => {
    localStorage.setItem("theme", theme);
    document.querySelector("body").className = theme
}

const toggleTheme = () => {
    localStorage.getItem("theme") === "theme-light" ? setTheme("theme-dark") : setTheme("theme-light")
}

(() => {
    localStorage.getItem("theme") === "theme-dark" ? setTheme("theme-dark") : setTheme("theme-light")
})()

document.querySelector(".theme-picker").addEventListener("click", toggleTheme)

// API SEARCH

const showError = msg => {
    const spanError = document.querySelector(".error-message")
    spanError.textContent = msg
    spanError.classList.add("show")
    setTimeout(() => spanError.classList.remove("show"), 3000)
}

const fetchUser = async username => {
    const data = await fetch(`https://api.github.com/users/${username}`)
    if(data.status !== 200) {
        showError("No such user") 
        return
    }
    const parsed = await data.json()
    const joinedText = `Joined ${parsed.created_at.slice(0,10)}`

    document.querySelector(".users-name").textContent = parsed.name ? parsed.name : "Not available"
    document.querySelector(".date-joined").textContent = joinedText
    document.querySelector(".username").textContent = "@" + parsed.login
    document.querySelector(".bio").textContent = parsed.bio ? parsed.bio : "Not available"
    document.querySelector(".repos").textContent = parsed.public_repos
    document.querySelector(".followers").textContent = parsed.followers
    document.querySelector(".following").textContent = parsed.following
    document.querySelector(".location-text").textContent = parsed.location ? parsed.location : "Not available"
    document.querySelector(".twitter-text").textContent = parsed.twitter_username ? parsed.twitter_username : "Not available"
    document.querySelector(".company-text").textContent = parsed.company ? parsed.company : "Not available"
    document.querySelector(".website-text").textContent = parsed.blog ? parsed.blog : "Not available"
    document.querySelectorAll(".profile-picture").forEach(img => img.src = parsed.avatar_url)
}

const handleUserSearch = () => {
    const username = document.querySelector(".input-username").value
    username.trim() === "" ? showError("Can't be empty") : fetchUser(username)
}

document.querySelector(".btn-submit").addEventListener("click", handleUserSearch)

fetchUser("octocat")
