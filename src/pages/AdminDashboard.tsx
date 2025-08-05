import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import ProtectedRoute from '../components/ProtectedRoute';

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  service: string;
  occasion: string;
  date: string;
  add_ons: string[];
  pinterestInspo?: string;
  inspirationUrls: string[];
  submittedAt: any;
}

interface Subscriber {
  id: string;
  email: string;
  subscribedAt: any;
}

const AdminDashboard: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [activeTab, setActiveTab] = useState<'contacts' | 'subscribers'>('contacts');
  const [loading, setLoading] = useState(true);


  useEffect(() => {
  const fetchContacts = async () => {
    const { data, error } = await supabase
      .from('contacts') // your Supabase table name
      .select('*')
      .order('submittedAt', { ascending: false });

    if (error) {
      console.error('Error fetching contacts:', error.message);
    } else {
      setContacts(data as Contact[]);
    }
    setLoading(false);
  };

  const fetchSubscribers = async () => {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .order('subscribedAt', { ascending: false });

    if (error) {
      console.error('Error fetching subscribers:', error.message);
    } else {
      setSubscribers(data as Subscriber[]);
    }
  };

  fetchContacts();
  fetchSubscribers();
}, []);

  useEffect(() => {

    // Supabase: Newsletter Subscribers
    const fetchSubscribers = async () => {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .order('subscribedAt', { ascending: false });

      if (error) {
        console.error('Error fetching subscribers:', error.message);
      } else {
        setSubscribers(data as Subscriber[]);
      }
    };

    fetchSubscribers();

    return () => {
    };
  }, []);

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(date);
  };

  return (
    <ProtectedRoute>
      <div className="container-custom py-20 mt-20">
        <h2 className="text-3xl font-serif mb-8">Admin Dashboard</h2>

        <div className="mb-6">
          <div className="border-b border-accent">
            <button
              className={`px-4 py-2 mr-4 ${activeTab === 'contacts' ? 'border-b-2 border-primary' : ''}`}
              onClick={() => setActiveTab('contacts')}
            >
              Contact Submissions
            </button>
            <button
              className={`px-4 py-2 ${activeTab === 'subscribers' ? 'border-b-2 border-primary' : ''}`}
              onClick={() => setActiveTab('subscribers')}
            >
              Newsletter Subscribers
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="loader"></div>
          </div>
        ) : (
          <>
            {activeTab === 'contacts' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-accent">
                      <th className="text-left py-2 px-4">Date</th>
                      <th className="text-left py-2 px-4">Name</th>
                      <th className="text-left py-2 px-4">Email</th>
                      <th className="text-left py-2 px-4">Service</th>
                      <th className="text-left py-2 px-4">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map(contact => (
                      <tr key={contact.id} className="border-b border-accent hover:bg-gray-50">
                        <td className="py-2 px-4">{formatDate(contact.submittedAt)}</td>
                        <td className="py-2 px-4">{`${contact.firstName} ${contact.lastName}`}</td>
                        <td className="py-2 px-4">
                          <a href={`mailto:${contact.email}`} className="text-primary hover:underline">
                            {contact.email}
                          </a>
                        </td>
                        <td className="py-2 px-4">{contact.service}</td>
                        <td className="py-2 px-4">
                          <details className="cursor-pointer">
                            <summary>View Details</summary>
                            <div className="mt-2 text-sm">
                              <p><strong>Occasion:</strong> {contact.occasion}</p>
                              <p><strong>Date:</strong> {contact.date}</p>
                              {contact.add_ons.length > 0 && (
                                <div>
                                  <strong>Add-ons:</strong>
                                  <ul className="list-disc ml-4">
                                    {contact.add_ons.map((addon, i) => (
                                      <li key={i}>{addon}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {contact.pinterestInspo && (
                                <p>
                                  <strong>Pinterest:</strong>{' '}
                                  <a
                                    href={contact.pinterestInspo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline"
                                  >
                                    View Board
                                  </a>
                                </p>
                              )}
                              {contact.inspirationUrls?.length > 0 && (
                                <div>
                                  <strong>Inspiration Images:</strong>
                                  <div className="grid grid-cols-3 gap-2 mt-2">
                                    {contact.inspirationUrls.map((url, i) => (
                                      <a
                                        key={i}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block"
                                      >
                                        <img
                                          src={url}
                                          alt={`Inspiration ${i + 1}`}
                                          className="w-full h-auto"
                                          loading="lazy"
                                        />
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </details>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'subscribers' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-accent">
                      <th className="text-left py-2 px-4">Date</th>
                      <th className="text-left py-2 px-4">Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map(subscriber => (
                      <tr key={subscriber.id} className="border-b border-accent hover:bg-gray-50">
                        <td className="py-2 px-4">{formatDate(subscriber.subscribedAt)}</td>
                        <td className="py-2 px-4">
                          <a href={`mailto:${subscriber.email}`} className="text-primary hover:underline">
                            {subscriber.email}
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default AdminDashboard;