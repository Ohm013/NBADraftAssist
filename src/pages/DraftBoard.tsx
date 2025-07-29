import { useState } from "react";
import { PlayerCard } from "@/components/PlayerCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";

// Mock data - in a real app this would come from an API
const mockPlayers = [
  {
    id: "1",
    name: "Victor Wembanyama",
    position: "C",
    college: "Metropolitans 92",
    height: "7'4\"",
    weight: "230 lbs",
    age: 20,
    ranking: 1,
    projected_pick: 1,
    stats: { ppg: 21.4, rpg: 10.4, apg: 3.0, fg_percentage: 0.462 }
  },
  {
    id: "2",
    name: "Scoot Henderson",
    position: "PG",
    college: "G League Ignite",
    height: "6'2\"",
    weight: "195 lbs",
    age: 19,
    ranking: 2,
    projected_pick: 2,
    stats: { ppg: 16.5, rpg: 5.4, apg: 6.8, fg_percentage: 0.438 }
  },
  {
    id: "3",
    name: "Brandon Miller",
    position: "SF",
    college: "Alabama",
    height: "6'9\"",
    weight: "200 lbs",
    age: 20,
    ranking: 3,
    projected_pick: 3,
    stats: { ppg: 18.8, rpg: 8.2, apg: 2.3, fg_percentage: 0.433 }
  },
  {
    id: "4",
    name: "Amen Thompson",
    position: "SG",
    college: "Overtime Elite",
    height: "6'7\"",
    weight: "210 lbs",
    age: 20,
    ranking: 4,
    projected_pick: 5,
    stats: { ppg: 15.2, rpg: 6.8, apg: 7.1, fg_percentage: 0.521 }
  },
  {
    id: "5",
    name: "Ausar Thompson",
    position: "SG",
    college: "Overtime Elite",
    height: "6'7\"",
    weight: "205 lbs",
    age: 20,
    ranking: 5,
    projected_pick: 6,
    stats: { ppg: 14.8, rpg: 7.2, apg: 6.4, fg_percentage: 0.498 }
  }
];

const nbaTeams = [
  { name: "San Antonio Spurs", pick: 1 },
  { name: "Charlotte Hornets", pick: 2 },
  { name: "Portland Trail Blazers", pick: 3 },
  { name: "Houston Rockets", pick: 4 },
  { name: "Detroit Pistons", pick: 5 },
];

interface DraftPick {
  pick: number;
  team: string;
  player?: any;
}

export default function DraftBoard() {
  const [availablePlayers, setAvailablePlayers] = useState(mockPlayers);
  const [draftedPlayers, setDraftedPlayers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPosition, setSelectedPosition] = useState<string>("ALL");
  
  const [draftBoard, setDraftBoard] = useState<DraftPick[]>(
    nbaTeams.map(team => ({ pick: team.pick, team: team.name }))
  );

  const handleDraftPlayer = (player: any) => {
    const nextPick = draftBoard.find(pick => !pick.player);
    if (!nextPick) return;

    const updatedDraftBoard = draftBoard.map(pick => 
      pick.pick === nextPick.pick ? { ...pick, player } : pick
    );
    
    setDraftBoard(updatedDraftBoard);
    setAvailablePlayers(prev => prev.filter(p => p.id !== player.id));
    setDraftedPlayers(prev => [...prev, player]);
  };

  const resetDraft = () => {
    setDraftBoard(nbaTeams.map(team => ({ pick: team.pick, team: team.name })));
    setAvailablePlayers(mockPlayers);
    setDraftedPlayers([]);
  };

  const filteredPlayers = availablePlayers.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         player.college.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = selectedPosition === "ALL" || player.position === selectedPosition;
    return matchesSearch && matchesPosition;
  });

  const positions = ["ALL", "PG", "SG", "SF", "PF", "C"];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Draft Board</h1>
          <p className="text-muted-foreground">Track your NBA draft selections in real-time</p>
        </div>
        <Button onClick={resetDraft} variant="outline" className="gap-2">
          <RotateCcw className="w-4 h-4" />
          Reset Draft
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Draft Order */}
        <div className="lg:col-span-1">
          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                Draft Order
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {draftBoard.map((pick) => (
                  <div 
                    key={pick.pick} 
                    className={`p-3 rounded-lg border transition-all duration-200 ${
                      pick.player 
                        ? 'bg-primary/20 border-primary/30' 
                        : 'bg-muted/20 border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <Badge variant="outline" className="text-xs mb-1">
                          Pick #{pick.pick}
                        </Badge>
                        <p className="font-medium text-sm">{pick.team}</p>
                      </div>
                      {pick.player && (
                        <div className="text-right">
                          <p className="font-bold text-sm text-primary">{pick.player.name}</p>
                          <p className="text-xs text-muted-foreground">{pick.player.position} - {pick.player.college}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Available Players */}
        <div className="lg:col-span-2">
          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle>Available Players</CardTitle>
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search players..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  {positions.map(position => (
                    <Button
                      key={position}
                      variant={selectedPosition === position ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedPosition(position)}
                    >
                      {position}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredPlayers.map((player) => (
                  <PlayerCard
                    key={player.id}
                    player={player}
                    onDraft={handleDraftPlayer}
                  />
                ))}
              </div>
              
              {filteredPlayers.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No players found matching your criteria</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}