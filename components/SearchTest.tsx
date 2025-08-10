"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { apiService } from "@/lib/api";

const SearchTest = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setError(null);
    setSearchResults(null);

    try {
      console.log('SearchTest - Starting search for:', searchQuery);
      const results = await apiService.search(searchQuery);
      console.log('SearchTest - Search results:', results);
      setSearchResults(results);
    } catch (err) {
      console.error('SearchTest - Search error:', err);
      setError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <Card>
        <CardHeader>
          <CardTitle>Test Search Functionality</CardTitle>
          <CardDescription>
            Enter a search term to test the search API
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input
              type="text"
              placeholder="Enter search term..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1"
            />
            <Button onClick={handleSearch} disabled={isLoading}>
              {isLoading ? 'Searching...' : 'Search'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800">Search Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-700">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Results Display */}
      {searchResults && (
        <div className="space-y-6">
          {/* Services Results */}
          <Card>
            <CardHeader>
              <CardTitle>Services Found ({searchResults.services?.length || 0})</CardTitle>
            </CardHeader>
            <CardContent>
              {searchResults.services && searchResults.services.length > 0 ? (
                <div className="space-y-4">
                  {searchResults.services.map((service: any) => (
                    <div key={service.id} className="p-4 border rounded-lg">
                      <h4 className="font-semibold">{service.title}</h4>
                      <p className="text-sm text-gray-600">{service.description}</p>
                      <p className="text-xs text-gray-500">Slug: {service.slug}</p>
                      <pre className="text-xs bg-gray-100 p-2 mt-2 rounded">
                        {JSON.stringify(service, null, 2)}
                      </pre>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No services found</p>
              )}
            </CardContent>
          </Card>

          {/* Team Results */}
          <Card>
            <CardHeader>
              <CardTitle>Team Members Found ({searchResults.team?.length || 0})</CardTitle>
            </CardHeader>
            <CardContent>
              {searchResults.team && searchResults.team.length > 0 ? (
                <div className="space-y-4">
                  {searchResults.team.map((member: any) => (
                    <div key={member.id} className="p-4 border rounded-lg">
                      <h4 className="font-semibold">{member.name}</h4>
                      <p className="text-sm text-gray-600">{member.role}</p>
                      <p className="text-xs text-gray-500">Specialty: {member.specialty}</p>
                      <pre className="text-xs bg-gray-100 p-2 mt-2 rounded">
                        {JSON.stringify(member, null, 2)}
                      </pre>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No team members found</p>
              )}
            </CardContent>
          </Card>

          {/* Raw Results */}
          <Card>
            <CardHeader>
              <CardTitle>Raw API Response</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-xs bg-gray-100 p-4 rounded overflow-auto max-h-96">
                {JSON.stringify(searchResults, null, 2)}
              </pre>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SearchTest;
