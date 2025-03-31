import React from 'react';

export function HelpSection() {
  return (
    <section className="mt-16 border-t border-neutral-200 pt-8">
      <h2 className="text-xl font-bold font-sans text-neutral-800 mb-4">Need Help?</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-neutral-100 p-5 rounded-lg">
          <h3 className="font-semibold text-primary mb-2">Search Tips</h3>
          <ul className="text-neutral-700 text-sm space-y-2">
            <li>• Search for medical conditions, procedures, or anatomical terms</li>
            <li>• Use formal medical terminology for more accurate results</li>
            <li>• Try both common names and scientific names</li>
            <li>• Click on related terms to explore connections</li>
          </ul>
        </div>
        <div className="bg-neutral-100 p-5 rounded-lg">
          <h3 className="font-semibold text-primary mb-2">About This Tool</h3>
          <p className="text-neutral-700 text-sm">
            This medical dictionary provides definitions for thousands of medical terms. 
            It's designed to be accessible for everyone from healthcare professionals to students 
            and the general public. All content is reviewed by medical experts.
          </p>
        </div>
      </div>
    </section>
  );
}
