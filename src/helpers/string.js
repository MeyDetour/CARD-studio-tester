export function getGainIdOfGainString(gainString) {
    let regex = /{gain#(\d+)}/;
    let match = gainString.match(regex);    
    if (match) {
        return match[1]; 
    }
    return null;
}