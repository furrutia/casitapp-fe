import { NEIGHBORHOODS } from '../data/neighborhoods';

export function isValidNeighborhood(neighborhood) {
    return NEIGHBORHOODS.includes(neighborhood);
}