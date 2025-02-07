import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import useLocalDatabase from "@/lib/localDatabase";

const Directory = () => {
  const [users, setUsers] = useState([]);
  const localDatabase = useLocalDatabase();

  useEffect(() => {
    const fetchUsers = async () => {
      const profiles = await localDatabase.getProfiles();
      setUsers(profiles);
    };

    fetchUsers();
  }, []);

  return (
    <div className="space-y-4 py-4 animate-fade-in">
      <h1 className="text-2xl font-bold text-white mb-6">User Directory</h1>
      {users.length === 0 ? (
        <Card className="p-4 bg-[#1a1d21]/90 backdrop-blur-lg border-none animate-fade-in">
          <p className="text-center text-gray-400">No users found</p>
        </Card>
      ) : (
        users.map((user) => (
          <Card key={user.id} className="p-4 bg-[#1a1d21]/90 backdrop-blur-lg border-none hover:bg-[#2a2d31] transition-colors animate-fade-in">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="bg-[#2a2d31] text-white">
                  {user.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-white">{user.username}</h3>
                <p className="text-sm text-gray-400">{user.full_name || "No full name"}</p>
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );
};

export default Directory;
