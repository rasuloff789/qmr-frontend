export default function (arr, bool) {
    let host = "root.elli.uz"
    // let host = window.location.hostname
    let dir = host.split(".")[0]
    if (bool) return dir
    return arr.includes(dir)
}