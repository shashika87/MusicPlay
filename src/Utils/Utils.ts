export function nextIndex(index,len) {
   let i = index
    i = i + 1; // increase i by one
    i = i % len; // if we've gone too high, start from `0` again
    return i; // give us back the item of where we are now
}
export function prevIndex(index,len) {
   let i = index
    if (i === 0) { // i would become 0
        i = len; // so put it at the other end of the array
    }
    i = i - 1; // decrease by one
    return i; // give us back the item of where we are now
}