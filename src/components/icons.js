/**
 * Explicit icon registry.
 *
 * Status metadata and alerts name their icon as a string, which needs a lookup.
 * A namespace import (`import * as icons`) would resolve that lookup at the cost
 * of pulling the entire icon library into the bundle, so the icons the product
 * actually uses are listed here and nothing else ships.
 *
 * Adding a new `icon:` string anywhere means adding it here too — the registry
 * falls back to Circle rather than crashing, and `npm run verify` checks that
 * every status has an icon.
 */

import {
  Archive, Asterisk, BadgeCheck, Circle, CircleCheck, CirclePlus, CircleSlash,
  ClipboardCheck, Compass, Eye, FastForward, Flag, Hourglass, Inbox, Info,
  Laptop, Loader, Lock, MailX, MapPin, OctagonAlert, PenSquare, PencilLine,
  Paperclip, PlayCircle, PlugZap, SearchX, ShieldAlert, Sparkles, TrendingUp,
  TriangleAlert, UserCheck,
} from 'lucide-react'

export const ICONS = {
  Archive, Asterisk, BadgeCheck, Circle, CircleCheck, CirclePlus, CircleSlash,
  ClipboardCheck, Compass, Eye, FastForward, Flag, Hourglass, Inbox, Info,
  Laptop, Loader, Lock, MailX, MapPin, OctagonAlert, PenSquare, PencilLine,
  Paperclip, PlayCircle, PlugZap, SearchX, ShieldAlert, Sparkles, TrendingUp,
  TriangleAlert, UserCheck,
}

export function resolveIcon(name, fallback = Circle) {
  return ICONS[name] || fallback
}
