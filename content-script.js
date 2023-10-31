const selector = '#share-url'
// clock()

function clock() {
    console.log("Clock")
    shorten()
    setTimeout(clock, 200)
}

function waitForElement(selector) {
    return new Promise(resolve => {
        const el = document.querySelector(selector)
        if (el) { resolve(el) }
        
        const observer = new MutationObserver(() => {
            const el = document.querySelector(selector)
            if (el) { resolve(el) }
        })

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        })
    })
}

waitForElement('ytd-popup-container').then(popupContainer => {
    const observer = new MutationObserver(() => {
        const shareUrl = document.querySelector(selector)
        if (!shareUrl) return
    
        shorten(shareUrl)
    })
    
    observer.observe(popupContainer, {
        childList: true,
        subtree: true,
        attributes: true
    })
})

function shorten(shareUrl) {
    // Replace URL
    const url = new URL(shareUrl.value)
    url.searchParams.delete('si')
    shareUrl.value = url
}
