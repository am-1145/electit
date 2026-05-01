/**
 * ScreenReaderService
 * 
 * A utility for managing screen reader announcements using aria-live regions.
 * This helps improve the accessibility score by ensuring dynamic content changes
 * are communicated to assistive technology.
 */

class ScreenReaderService {
  constructor() {
    this.announcerId = 'sr-announcer';
    this.createAnnouncer();
  }

  /**
   * Creates an aria-live region in the DOM if it doesn't exist.
   * @private
   */
  createAnnouncer() {
    if (typeof document === 'undefined') return;
    
    let announcer = document.getElementById(this.announcerId);
    if (!announcer) {
      announcer = document.createElement('div');
      announcer.id = this.announcerId;
      announcer.setAttribute('aria-live', 'polite');
      announcer.setAttribute('aria-atomic', 'true');
      announcer.style.position = 'absolute';
      announcer.style.width = '1px';
      announcer.style.height = '1px';
      announcer.style.margin = '-1px';
      announcer.style.padding = '0';
      announcer.style.overflow = 'hidden';
      announcer.style.clip = 'rect(0, 0, 0, 0)';
      announcer.style.border = '0';
      document.body.appendChild(announcer);
    }
    this.announcer = announcer;
  }

  /**
   * Announces a message to screen readers.
   * @param {string} message - The message to announce.
   * @param {string} [priority='polite'] - The priority of the announcement ('polite' or 'assertive').
   */
  announce(message, priority = 'polite') {
    if (!this.announcer) return;
    
    this.announcer.setAttribute('aria-live', priority);
    this.announcer.textContent = '';
    
    // Small timeout to ensure the change is detected
    setTimeout(() => {
      this.announcer.textContent = message;
    }, 100);
  }
}

export const screenReader = new ScreenReaderService();
export default screenReader;
