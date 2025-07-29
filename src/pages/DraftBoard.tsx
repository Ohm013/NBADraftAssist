import { useState } from "react";
import { PlayerCard } from "@/components/PlayerCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";

// Mock fantasy basketball players - in a real app this would come from an API
const mockPlayers = [
  {
    id: "1",
    name: "Nikola Jokic",
    position: "C",
    team: "Denver Nuggets",
    height: "6'11\"",
    weight: "284 lbs",
    age: 29,
    ranking: 1,
    adp: 1.2,
    stats: { ppg: 24.5, rpg: 11.8, apg: 9.8, fg_percentage: 0.632, fantasy_points: 58.4 }
  },
  {
    id: "2",
    name: "Luka Doncic",
    position: "PG",
    team: "Dallas Mavericks",
    height: "6'7\"",
    weight: "230 lbs",
    age: 25,
    ranking: 2,
    adp: 1.8,
    stats: { ppg: 32.4, rpg: 8.6, apg: 8.0, fg_percentage: 0.456, fantasy_points: 57.8 }
  },
  {
    id: "3",
    name: "Shai Gilgeous-Alexander",
    position: "PG",
    team: "Oklahoma City Thunder",
    height: "6'6\"",
    weight: "195 lbs",
    age: 26,
    ranking: 3,
    adp: 2.5,
    stats: { ppg: 30.1, rpg: 5.5, apg: 6.2, fg_percentage: 0.535, fantasy_points: 54.2 }
  },
  {
    id: "4",
    name: "Giannis Antetokounmpo",
    position: "PF",
    team: "Milwaukee Bucks",
    height: "6'11\"",
    weight: "243 lbs",
    age: 29,
    ranking: 4,
    adp: 3.1,
    stats: { ppg: 30.4, rpg: 11.5, apg: 6.5, fg_percentage: 0.612, fantasy_points: 56.7 }
  },
  {
    id: "5",
    name: "Jayson Tatum",
    position: "SF",
    team: "Boston Celtics",
    height: "6'8\"",
    weight: "210 lbs",
    age: 26,
    ranking: 5,
    adp: 4.2,
    stats: { ppg: 26.9, rpg: 8.1, apg: 4.9, fg_percentage: 0.466, fantasy_points: 48.3 }
  }
];

const fantasyTeams = [
  { name: "Team Alpha", owner: "Alex", pick: 1 },
  { name: "Thunder Bolts", owner: "Jordan", pick: 2 },
  { name: "Slam Dunkers", owner: "Taylor", pick: 3 },
  { name: "Court Kings", owner: "Casey", pick: 4 },
  { name: "Hoop Dreams", owner: "Morgan", pick: 5 },
  { name: "Ball Hawks", owner: "Riley", pick: 6 },
  { name: "Dunk Squad", owner: "Avery", pick: 7 },
  { name: "Triple Threat", owner: "Blake", pick: 8 },
  { name: "Fast Break", owner: "Drew", pick: 9 },
  { name: "Clutch Time", owner: "Sage", pick: 10 },
];

interface DraftPick {
  pick: number;
  team: string;
  owner: string;
  player?: any;
}

export default function DraftBoard() {
  const [availablePlayers, setAvailablePlayers] = useState(mockPlayers);
  const [draftedPlayers, setDraftedPlayers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPosition, setSelectedPosition] = useState<string>("ALL");
  
  const [draftBoard, setDraftBoard] = useState<DraftPick[]>(
    fantasyTeams.map(team => ({ pick: team.pick, team: team.name, owner: team.owner }))
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
    setDraftBoard(fantasyTeams.map(team => ({ pick: team.pick, team: team.name, owner: team.owner })));
    setAvailablePlayers(mockPlayers);
    setDraftedPlayers([]);
  };

  const filteredPlayers = availablePlayers.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         player.team.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = selectedPosition === "ALL" || player.position === selectedPosition;
    return matchesSearch && matchesPosition;
  });

  const positions = ["ALL", "PG", "SG", "SF", "PF", "C"];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Fantasy Draft Board</h1>
          <p className="text-muted-foreground">Track your fantasy basketball draft picks in real-time</p>
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
              <div className="space-y-3 max-h-96 overflow-y-auto">
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
                        <p className="text-xs text-muted-foreground">{pick.owner}</p>
                      </div>
                      {pick.player && (
                        <div className="text-right">
                          <p className="font-bold text-sm text-primary">{pick.player.name}</p>
                          <p className="text-xs text-muted-foreground">{pick.player.position} - {pick.player.team}</p>
                          <p className="text-xs text-muted-foreground">{pick.player.stats.fantasy_points} FPTS</p>
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
                    placeholder="Search players or teams..."
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